from rest_framework import serializers

from apps.users.models import User
from apps.wallet.models import MasterProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "phone", "full_name", "role", "is_phone_verified", "created_at")
        read_only_fields = ("id", "phone", "role", "is_phone_verified", "created_at")


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("full_name",)


class SetRoleSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=["client", "master"])


class MasterProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterProfile
        fields = (
            "id",
            "category",
            "city",
            "district",
            "experience_years",
            "bio",
            "avatar",
            "rating_avg",
            "rating_count",
            "is_verified",
            "wallet_balance",
            "free_contact_credits",
            "created_at",
        )
        read_only_fields = (
            "id",
            "rating_avg",
            "rating_count",
            "is_verified",
            "wallet_balance",
            "free_contact_credits",
            "created_at",
        )


class MasterProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterProfile
        fields = ("category", "city", "district", "experience_years", "bio")
