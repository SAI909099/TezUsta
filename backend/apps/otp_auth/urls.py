from django.urls import path

from .views import RefreshTokenAPIView, SendOTPAPIView, VerifyOTPAPIView

urlpatterns = [
    path("auth/send-otp/", SendOTPAPIView.as_view(), name="send-otp"),
    path("auth/verify-otp/", VerifyOTPAPIView.as_view(), name="verify-otp"),
    path("auth/refresh/", RefreshTokenAPIView.as_view(), name="refresh-token"),
]
