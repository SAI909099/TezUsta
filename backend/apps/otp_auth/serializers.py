import hashlib
import random
from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from rest_framework import serializers

from .models import OTPCode


class SendOTPSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)

    def validate_phone(self, value):
        import re
        phone = re.sub(r"[^\d+]", "", value)
        if not phone.startswith("+998") or len(phone) != 13:
            raise serializers.ValidationError("Telefon raqami +998XXXXXXXXX formatida bo'lishi kerak.")
        return phone


class VerifyOTPSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)
    code = serializers.CharField(max_length=6, min_length=4)

    def validate_phone(self, value):
        import re
        phone = re.sub(r"[^\d+]", "", value)
        if not phone.startswith("+998") or len(phone) != 13:
            raise serializers.ValidationError("Telefon raqami +998XXXXXXXXX formatida bo'lishi kerak.")
        return phone

    def validate(self, data):
        phone = data.get("phone")
        code = data.get("code")

        otp = OTPCode.objects.filter(phone=phone, verified_at__isnull=True).first()

        if not otp:
            raise serializers.ValidationError({"code": "not_found", "message": "OTP kod topilmadi."})

        if otp.is_expired:
            raise serializers.ValidationError({"code": "expired", "message": "OTP kod muddati o'tgan."})

        if otp.attempts >= 3:
            raise serializers.ValidationError({"code": "attempts_exceeded", "message": "Ko'p marta noto'g'ri urinish. Yangi kod so'rang."})

        code_hash = hashlib.sha256(code.encode()).hexdigest()
        if otp.code_hash != code_hash:
            otp.attempts += 1
            otp.save(update_fields=["attempts"])
            raise serializers.ValidationError({"code": "invalid", "message": "Noto'g'ri kod."})

        data["otp"] = otp
        return data


def generate_otp_code():
    return str(random.randint(1000, 9999))


def create_otp_for_phone(phone):
    OTP_EXPIRE_MINUTES = 5

    OTPCode.objects.filter(phone=phone, verified_at__isnull=True).update(verified_at=timezone.now())

    code = generate_otp_code()
    code_hash = hashlib.sha256(code.encode()).hexdigest()

    otp = OTPCode.objects.create(
        phone=phone,
        code_hash=code_hash,
        expires_at=timezone.now() + timedelta(minutes=OTP_EXPIRE_MINUTES),
    )

    return otp, code
