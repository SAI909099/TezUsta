from django.urls import path

from .views import ApplyToJobAPIView

urlpatterns = [
    path("master/jobs/<int:job_id>/apply/", ApplyToJobAPIView.as_view(), name="job-apply"),
]

