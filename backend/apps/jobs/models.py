from django.conf import settings
from django.db import models


class JobStatus(models.TextChoices):
    OPEN = "open", "Open"
    ASSIGNED = "assigned", "Assigned"
    COMPLETED = "completed", "Completed"
    CANCELLED = "cancelled", "Cancelled"


class Job(models.Model):
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="client_jobs",
        limit_choices_to={"role": "client"},
    )
    category = models.ForeignKey(
        "categories.Category",
        on_delete=models.PROTECT,
        related_name="jobs",
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(upload_to="jobs/photos/", blank=True, null=True)
    city = models.CharField(max_length=100, db_index=True)
    district = models.CharField(max_length=120, db_index=True)
    address_text = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=JobStatus.choices,
        default=JobStatus.OPEN,
        db_index=True,
    )
    selected_application = models.ForeignKey(
        "applications.JobApplication",
        on_delete=models.SET_NULL,
        related_name="selected_jobs",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=["client", "status"]),
            models.Index(fields=["category", "status"]),
            models.Index(fields=["status", "created_at"]),
        ]

    def __str__(self):
        return self.title
