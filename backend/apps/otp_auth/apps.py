from django.apps import AppConfig


class OtpAuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.otp_auth"
    label = "otp_auth"
    verbose_name = "OTP Auth"
