from django.db import transaction
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.jobs.models import Job, JobStatus
from apps.users.permissions import IsClient
from config.api_mixins import SuccessEnvelopeMixin

from .models import Review
from .serializers import ReviewCreateSerializer, ReviewSerializer


class CreateReviewAPIView(SuccessEnvelopeMixin, CreateAPIView):
    permission_classes = (IsAuthenticated, IsClient)
    serializer_class = ReviewCreateSerializer

    def create(self, request, *args, **kwargs):
        job_id = kwargs["job_id"]

        try:
            job = Job.objects.get(id=job_id, client=request.user)
        except Job.DoesNotExist:
            return Response(
                {"success": False, "error": {"code": "not_found", "message": "Buyurtma topilmadi."}},
                status=status.HTTP_404_NOT_FOUND,
            )

        if job.status != JobStatus.COMPLETED:
            return Response(
                {"success": False, "error": {"code": "not_completed", "message": "Faqat yakunlangan buyurtmalarga sharh qoldirish mumkin."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not job.selected_application:
            return Response(
                {"success": False, "error": {"code": "no_selected_master", "message": "Usta tanlanmagan."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        master = job.selected_application.master

        if Review.objects.filter(job=job, client=request.user, master=master).exists():
            return Response(
                {"success": False, "error": {"code": "already_reviewed", "message": "Siz allaqachon bu buyurtma uchun sharh qoldirgansiz."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            review = Review.objects.create(
                job=job,
                client=request.user,
                master=master,
                rating=serializer.validated_data["rating"],
                comment=serializer.validated_data.get("comment", ""),
            )

            profile = master.master_profile
            new_count = profile.rating_count + 1
            new_avg = ((profile.rating_avg * profile.rating_count) + review.rating) / new_count
            profile.rating_avg = round(new_avg, 2)
            profile.rating_count = new_count
            profile.save(update_fields=["rating_avg", "rating_count"])

        out = ReviewSerializer(review).data
        return self.success_response(out, status=status.HTTP_201_CREATED)


class MasterReviewsListAPIView(SuccessEnvelopeMixin, ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ReviewSerializer

    def get_queryset(self):
        master_id = self.kwargs["master_id"]
        return Review.objects.filter(master_id=master_id).select_related("client").order_by("-created_at")

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return self.success_response(
            response.data,
            status=response.status_code,
            headers=response.headers,
        )
