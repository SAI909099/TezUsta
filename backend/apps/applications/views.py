from django.db import IntegrityError, transaction
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.jobs.models import Job, JobStatus
from apps.users.permissions import IsClient, IsMaster
from config.api_mixins import SuccessEnvelopeMixin

from .models import JobApplication
from .serializers import JobApplicationListForClientSerializer, JobApplySerializer
from .services import unlock_client_contact


class ApplyToJobAPIView(CreateAPIView):
    permission_classes = (IsAuthenticated, IsMaster)
    serializer_class = JobApplySerializer

    def create(self, request, *args, **kwargs):
        job_id = kwargs["job_id"]
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response(
                {"success": False, "error": {"code": "not_found", "message": "Job not found."}},
                status=status.HTTP_404_NOT_FOUND,
            )

        if job.client_id == request.user.id:
            return Response(
                {
                    "success": False,
                    "error": {
                        "code": "own_job",
                        "message": "You cannot apply to your own job.",
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if job.status != JobStatus.OPEN:
            return Response(
                {
                    "success": False,
                    "error": {
                        "code": "job_not_open",
                        "message": "You can only apply to open jobs.",
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            with transaction.atomic():
                application = JobApplication.objects.create(
                    job=job,
                    master=request.user,
                    message=serializer.validated_data.get("message", ""),
                )
        except IntegrityError:
            return Response(
                {
                    "success": False,
                    "error": {
                        "code": "duplicate_application",
                        "message": "You already applied to this job.",
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        out = JobApplySerializer(application).data
        return Response({"success": True, "data": out}, status=status.HTTP_201_CREATED)


class JobApplicationsForClientAPIView(SuccessEnvelopeMixin, ListAPIView):
    permission_classes = (IsAuthenticated, IsClient)
    serializer_class = JobApplicationListForClientSerializer

    def get_queryset(self):
        job_id = self.kwargs["job_id"]
        # Ownership check: only job owner can list applications.
        try:
            job = Job.objects.only("id").get(id=job_id, client=self.request.user)
        except Job.DoesNotExist:
            return JobApplication.objects.none()

        return (
            JobApplication.objects.filter(job=job)
            .select_related("master", "master__master_profile")
            .order_by("-applied_at")
        )

    def list(self, request, *args, **kwargs):
        # Return 404 if job doesn't exist or isn't owned by this client (avoid leaking job existence).
        job_id = kwargs["job_id"]
        if not Job.objects.filter(id=job_id, client=request.user).exists():
            return Response(
                {"success": False, "error": {"code": "not_found", "message": "Job not found."}},
                status=status.HTTP_404_NOT_FOUND,
            )

        response = super().list(request, *args, **kwargs)
        return self.success_response(
            response.data,
            status=response.status_code,
            headers=response.headers,
        )


class UnlockContactAPIView(SuccessEnvelopeMixin, CreateAPIView):
    permission_classes = (IsAuthenticated, IsMaster)
    serializer_class = None

    def post(self, request, *args, **kwargs):
        application_id = kwargs["application_id"]

        try:
            application, profile = unlock_client_contact(
                application_id=application_id,
                master_user=request.user,
            )
        except JobApplication.DoesNotExist:
            return Response(
                {"success": False, "error": {"code": "not_found", "message": "Application not found."}},
                status=status.HTTP_404_NOT_FOUND,
            )
        except PermissionError as exc:
            code = str(exc)
            return Response(
                {"success": False, "error": {"code": code, "message": "Not allowed."}},
                status=status.HTTP_403_FORBIDDEN,
            )
        except ValueError as exc:
            code = str(exc)
            if code == "insufficient_funds":
                return Response(
                    {
                        "success": False,
                        "error": {
                            "code": "insufficient_funds",
                            "message": "Not enough balance to unlock contact.",
                        },
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(
                {"success": False, "error": {"code": code, "message": "Unlock failed."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If service returned None profile (already unlocked path), fetch current profile for response.
        if profile is None:
            profile = request.user.master_profile

        client = application.job.client
        return self.success_response(
            {
                "application_id": application.id,
                "status": application.status,
                "contact_unlocked_at": application.contact_unlocked_at,
                "client_contact": {
                    "phone": client.phone,
                    "full_name": client.full_name,
                },
                "wallet_balance": profile.wallet_balance,
                "free_contact_credits": profile.free_contact_credits,
            },
            status=status.HTTP_200_OK,
        )
