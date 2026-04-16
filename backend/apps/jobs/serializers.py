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


class ClientJobListSerializer(serializers.ModelSerializer):
    category = serializers.IntegerField(source="category_id", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Job
        fields = (
            "id",
            "category",
            "category_name",
            "title",
            "description",
            "photo",
            "city",
            "district",
            "address_text",
            "status",
            "created_at",
            "updated_at",
        )


class MasterJobFeedSerializer(serializers.ModelSerializer):
    category = serializers.IntegerField(source="category_id", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    applications_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Job
        fields = (
            "id",
            "category",
            "category_name",
            "title",
            "description",
            "photo",
            "city",
            "district",
            "address_text",
            "status",
            "created_at",
            "applications_count",
        )


class SelectMasterRequestSerializer(serializers.Serializer):
    application_id = serializers.IntegerField(min_value=1)


class JobSummarySerializer(serializers.ModelSerializer):
    category = serializers.IntegerField(source="category_id", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Job
        fields = (
            "id",
            "category",
            "category_name",
            "title",
            "status",
            "created_at",
            "updated_at",
            "selected_application",
        )

