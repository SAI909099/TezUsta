from rest_framework import serializers

from .models import Review


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("rating", "comment")
        extra_kwargs = {
            "comment": {"required": False, "allow_blank": True},
        }

    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Reyting 1 dan 5 gacha bo'lishi kerak.")
        return value


class ReviewSerializer(serializers.ModelSerializer):
    client_full_name = serializers.CharField(source="client.full_name", read_only=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "job_id",
            "client_id",
            "client_full_name",
            "master_id",
            "rating",
            "comment",
            "created_at",
        )
        read_only_fields = ("id", "job_id", "client_id", "master_id", "created_at")
