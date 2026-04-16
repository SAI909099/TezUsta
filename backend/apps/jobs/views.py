from django.db.models import Count
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.users.permissions import IsClient, IsMaster
from config.api_mixins import SuccessEnvelopeMixin

from .models import Job, JobStatus
from .serializers import (
    ClientJobListSerializer,
    JobCreateSerializer,
    JobListSerializer,
    JobSummarySerializer,
    MasterJobFeedSerializer,
    SelectMasterRequestSerializer,
)
from .services import select_master_for_job


class JobCreateAPIView(SuccessEnvelopeMixin, CreateAPIView):
    permission_classes = (IsAuthenticated, IsClient)
    serializer_class = JobCreateSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return self.success_response(
            response.data,
            status=response.status_code,
            headers=response.headers,
        )


class MyJobsListAPIView(SuccessEnvelopeMixin, ListAPIView):
    permission_classes = (IsAuthenticated, IsClient)
    serializer_class = ClientJobListSerializer

    def get_queryset(self):
        return (
            Job.objects.filter(client=self.request.user)
            .select_related("category")
            .order_by("-created_at")
        )

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return self.success_response(
            response.data,
            status=response.status_code,
            headers=response.headers,
        )


class MasterOpenJobsListAPIView(SuccessEnvelopeMixin, ListAPIView):
    permission_classes = (IsAuthenticated, IsMaster)
    serializer_class = MasterJobFeedSerializer

    def get_queryset(self):
        return (
            Job.objects.filter(status=JobStatus.OPEN)
            .exclude(client=self.request.user)
            .select_related("category")
            .annotate(applications_count=Count("applications"))
            .order_by("-created_at")
        )

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return self.success_response(
            response.data,
            status=response.status_code,
            headers=response.headers,
        )


class SelectMasterAPIView(SuccessEnvelopeMixin, CreateAPIView):
    permission_classes = (IsAuthenticated, IsClient)
    serializer_class = SelectMasterRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        job_id = kwargs["job_id"]
        application_id = serializer.validated_data["application_id"]

        try:
            job, application = select_master_for_job(
                job_id=job_id,
                client_user=request.user,
                application_id=application_id,
            )
        except Job.DoesNotExist:
            return Response(
                {"success": False, "error": {"code": "not_found", "message": "Job not found."}},
                status=status.HTTP_404_NOT_FOUND,
            )
        except PermissionError:
            return Response(
                {"success": False, "error": {"code": "not_found", "message": "Job not found."}},
                status=status.HTTP_404_NOT_FOUND,
            )
        except ValueError as exc:
            code = str(exc)
            message_map = {
                "job_not_open": "Only open jobs can be assigned.",
                "already_selected": "A master has already been selected for this job.",
                "application_not_applicable": "This application cannot be selected.",
            }
            return Response(
                {
                    "success": False,
                    "error": {
                        "code": code,
                        "message": message_map.get(code, "Selection failed."),
                    },
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception:
            # Avoid leaking details; DRF exception handler covers most cases,
            # but service errors could still bubble up.
            return Response(
                {"success": False, "error": {"code": "error", "message": "Selection failed."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        from apps.applications.serializers import ApplicationSummarySerializer

        job_out = JobSummarySerializer(job).data
        app_out = ApplicationSummarySerializer(application).data
        return self.success_response(
            {"job": job_out, "selected_application": app_out},
            status=status.HTTP_200_OK,
        )
