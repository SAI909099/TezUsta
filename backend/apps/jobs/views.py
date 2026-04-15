from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from apps.users.permissions import IsClient, IsMaster
from config.api_mixins import SuccessEnvelopeMixin

from .models import Job, JobStatus
from .serializers import JobCreateSerializer, JobListSerializer


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
    serializer_class = JobListSerializer

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
    serializer_class = JobListSerializer

    def get_queryset(self):
        return (
            Job.objects.filter(status=JobStatus.OPEN)
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
