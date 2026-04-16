from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import User
from config.api_mixins import SuccessEnvelopeMixin

from .serializers import SendOTPSerializer, VerifyOTPSerializer, create_otp_for_phone


class SendOTPAPIView(SuccessEnvelopeMixin, APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone = serializer.validated_data["phone"]
        otp, code = create_otp_for_phone(phone)

        return self.success_response(
            {
                "message": "OTP kod yuborildi (test uchun kod: {})".format(code),
                "phone": phone,
                "expires_at": otp.expires_at,
            },
            status=status.HTTP_200_OK,
        )


class VerifyOTPAPIView(SuccessEnvelopeMixin, APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone = serializer.validated_data["phone"]
        otp = serializer.validated_data["otp"]

        otp.verified_at = timezone.now()
        otp.save(update_fields=["verified_at"])

        user, created = User.objects.get_or_create(
            phone=phone,
            defaults={"full_name": phone, "is_phone_verified": True},
        )
        user.is_phone_verified = True
        user.save(update_fields=["is_phone_verified"])

        from rest_framework_simplejwt.tokens import RefreshToken

        refresh = RefreshToken.for_user(user)

        return self.success_response(
            {
                "user_id": user.id,
                "phone": user.phone,
                "full_name": user.full_name,
                "role": user.role,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )


class RefreshTokenAPIView(SuccessEnvelopeMixin, APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        from rest_framework_simplejwt.exceptions import InvalidToken
        from rest_framework_simplejwt.tokens import RefreshToken

        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"success": False, "error": {"code": "required", "message": "Refresh token talab qilinadi."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            refresh = RefreshToken(refresh_token)
            return self.success_response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK,
            )
        except InvalidToken:
            return Response(
                {"success": False, "error": {"code": "invalid_token", "message": "Noto'g'ri refresh token."}},
                status=status.HTTP_401_UNAUTHORIZED,
            )
