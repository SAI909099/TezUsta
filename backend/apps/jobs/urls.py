from django.urls import path

from .views import JobCreateAPIView, MasterOpenJobsListAPIView, MyJobsListAPIView

urlpatterns = [
    path("jobs/", JobCreateAPIView.as_view(), name="job-create"),
    path("jobs/my/", MyJobsListAPIView.as_view(), name="my-job-list"),
    path("master/jobs/", MasterOpenJobsListAPIView.as_view(), name="master-open-job-list"),
]

