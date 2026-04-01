from django.conf import settings
from django.db import models


class ApplicationStatus(models.TextChoices):
    APPLIED = "applied", "Applied"
    SELECTED = "selected", "Selected"
    REJECTED = "rejected", "Rejected"
    CONTACT_UNLOCKED = "contact_unlocked", "Contact Unlocked"


class JobApplication(models.Model):
    job = models.ForeignKey(
        "jobs.Job",
        on_delete=models.CASCADE,
        related_name="applications",
    )
    master = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="job_applications",
        limit_choices_to={"role": "master"},
    )
    message = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.APPLIED,
        db_index=True,
    )
    applied_at = models.DateTimeField(auto_now_add=True, db_index=True)
    selected_at = models.DateTimeField(null=True, blank=True)
    contact_unlocked_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ("-applied_at",)
        constraints = [
            models.UniqueConstraint(
                fields=["job", "master"],
                name="unique_master_application_per_job",
            ),
        ]
        indexes = [
            models.Index(fields=["job", "status"]),
            models.Index(fields=["master", "status"]),
        ]

    def __str__(self):
        return f"{self.master} -> {self.job}"
