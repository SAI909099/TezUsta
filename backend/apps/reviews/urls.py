from django.urls import path

from .views import CreateReviewAPIView, MasterReviewsListAPIView

urlpatterns = [
    path("jobs/<int:job_id>/reviews/", CreateReviewAPIView.as_view(), name="create-review"),
    path("master/<int:master_id>/reviews/", MasterReviewsListAPIView.as_view(), name="master-reviews"),
]
