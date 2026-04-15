from rest_framework import serializers

from apps.categories.models import Category

from .models import Job


class JobCreateSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        source="category",
        queryset=Category.objects.filter(is_active=True),
        write_only=True,
    )

    class Meta:
        model = Job
        fields = (
            "id",
            "category_id",
            "title",
            "description",
            "photo",
            "city",
            "district",
            "address_text",
            "status",
            "created_at",
        )
        read_only_fields = ("id", "status", "created_at")

    def create(self, validated_data):
        request = self.context["request"]
        return Job.objects.create(client=request.user, **validated_data)


class JobListSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = (
            "id",
            "title",
            "description",
            "photo",
            "city",
            "district",
            "address_text",
            "status",
            "category",
            "created_at",
        )

    def get_category(self, obj):
        return {
            "id": obj.category_id,
            "name": obj.category.name,
            "slug": obj.category.slug,
            "icon_name": obj.category.icon_name,
        }

