from django.db import transaction
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import User, UserRole
from apps.wallet.models import MasterProfile
from config.api_mixins import SuccessEnvelopeMixin

from .serializers import (
    MasterProfileSerializer,
    MasterProfileUpdateSerializer,
    SetRoleSerializer,
    UserSerializer,
    UserUpdateSerializer,
)


class CurrentUserAPIView(SuccessEnvelopeMixin, APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return self.success_response(serializer.data)

    def patch(self, request):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return self.success_response(UserSerializer(request.user).data)


class SetRoleAPIView(SuccessEnvelopeMixin, APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = SetRoleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_role = serializer.validated_data["role"]

        if request.user.role != UserRole.CLIENT:
            return Response(
                {"success": False, "error": {"code": "invalid_role", "message": "Role can only be changed from client role."}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        request.user.role = new_role
        request.user.save(update_fields=["role"])

        return self.success_response(
            {
                "user_id": request.user.id,
                "role": request.user.role,
            }
        )


class MasterProfileAPIView(SuccessEnvelopeMixin, APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.role != UserRole.MASTER:
            return Response(
                {"success": False, "error": {"code": "not_master", "message": "Siz usta emassiz."}},
                status=status.HTTP_403_FORBIDDEN,
            )

        profile, created = MasterProfile.objects.get_or_create(user=request.user)
        serializer = MasterProfileSerializer(profile)
        return self.success_response(serializer.data)

    def put(self, request):
        if request.user.role != UserRole.MASTER:
            return Response(
                {"success": False, "error": {"code": "not_master", "message": "Siz usta emassiz."}},
                status=status.HTTP_403_FORBIDDEN,
            )

        profile, created = MasterProfile.objects.get_or_create(user=request.user)
        serializer = MasterProfileUpdateSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return self.success_response(MasterProfileSerializer(profile).data)

    def patch(self, request):
        return self.put(request)
