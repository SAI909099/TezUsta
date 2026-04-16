from django.urls import path

from .views import CurrentUserAPIView, MasterProfileAPIView, SetRoleAPIView

urlpatterns = [
    path("auth/me/", CurrentUserAPIView.as_view(), name="current-user"),
    path("auth/set-role/", SetRoleAPIView.as_view(), name="set-role"),
    path("master/profile/", MasterProfileAPIView.as_view(), name="master-profile"),
]
