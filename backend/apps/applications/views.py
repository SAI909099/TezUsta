from django.db import IntegrityError, transaction
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.jobs.models import Job, JobStatus
from apps.users.permissions import IsMaster

from .models import JobApplication
from .serializers import JobApplySerializer


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
