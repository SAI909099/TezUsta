from rest_framework import serializers

from .models import JobApplication


class JobApplySerializer(serializers.ModelSerializer):
    job_id = serializers.IntegerField(source="job_id", read_only=True)
    master_id = serializers.IntegerField(source="master_id", read_only=True)

    class Meta:
        model = JobApplication
        fields = ("id", "job_id", "master_id", "message", "status", "applied_at")
        read_only_fields = ("id", "status", "applied_at")


class JobApplicationListForClientSerializer(serializers.ModelSerializer):
    application_id = serializers.IntegerField(source="id", read_only=True)
    master_id = serializers.IntegerField(source="master_id", read_only=True)
    master_full_name = serializers.CharField(source="master.full_name", read_only=True)
    master_profile = serializers.SerializerMethodField()

    class Meta:
        model = JobApplication
        fields = (
            "application_id",
            "master_id",
            "master_full_name",
            "message",
            "status",
            "applied_at",
            "selected_at",
            "contact_unlocked_at",
            "master_profile",
        )

    def get_master_profile(self, obj):
        profile = getattr(obj.master, "master_profile", None)
        if not profile:
            return None
        return {
            "experience_years": profile.experience_years,
            "rating_avg": str(profile.rating_avg),
            "rating_count": profile.rating_count,
        }


class ApplicationSummarySerializer(serializers.ModelSerializer):
    application_id = serializers.IntegerField(source="id", read_only=True)
    job_id = serializers.IntegerField(source="job_id", read_only=True)
    master_id = serializers.IntegerField(source="master_id", read_only=True)
    master_full_name = serializers.CharField(source="master.full_name", read_only=True)

    class Meta:
        model = JobApplication
        fields = (
            "application_id",
            "job_id",
            "master_id",
            "master_full_name",
            "message",
            "status",
            "applied_at",
            "selected_at",
        )

