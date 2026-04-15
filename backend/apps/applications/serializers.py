from rest_framework import serializers

from .models import JobApplication


class JobApplySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ("id", "message", "status", "applied_at")
        read_only_fields = ("id", "status", "applied_at")

