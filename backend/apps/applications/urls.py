from django.urls import path

from .views import ApplyToJobAPIView, JobApplicationsForClientAPIView, UnlockContactAPIView

urlpatterns = [
    path(
        "jobs/<int:job_id>/applications/",
        JobApplicationsForClientAPIView.as_view(),
        name="job-applications-for-client",
    ),
    path("master/jobs/<int:job_id>/apply/", ApplyToJobAPIView.as_view(), name="job-apply"),
    path(
        "applications/<int:application_id>/unlock-contact/",
        UnlockContactAPIView.as_view(),
        name="application-unlock-contact",
    ),
]

