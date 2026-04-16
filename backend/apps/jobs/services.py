from django.db import transaction
from django.utils import timezone

from apps.applications.models import ApplicationStatus, JobApplication

from .models import Job, JobStatus


@transaction.atomic
def select_master_for_job(*, job_id: int, client_user, application_id: int) -> tuple[Job, JobApplication]:
    """
    Select exactly one application for a job (MVP).
    - Only job owner can select
    - Selected application -> selected
    - Other applications -> rejected
    - Job -> assigned, selected_application set
    """
    job = (
        Job.objects.select_for_update()
        .select_related("category", "selected_application")
        .get(id=job_id)
    )

    if job.client_id != client_user.id:
        raise PermissionError("not_owner")

    if job.status != JobStatus.OPEN:
        raise ValueError("job_not_open")

    if job.selected_application_id is not None:
        raise ValueError("already_selected")

    application = (
        JobApplication.objects.select_for_update()
        .select_related("master")
        .get(id=application_id, job_id=job.id)
    )

    if application.status != ApplicationStatus.APPLIED:
        # Keep MVP rules strict and predictable.
        raise ValueError("application_not_applicable")

    now = timezone.now()

    # Update selected application first.
    application.status = ApplicationStatus.SELECTED
    application.selected_at = now
    application.save(update_fields=["status", "selected_at"])

    # Reject others (only those still "applied" to avoid clobbering future statuses).
    (
        JobApplication.objects.filter(job_id=job.id)
        .exclude(id=application.id)
        .filter(status=ApplicationStatus.APPLIED)
        .update(status=ApplicationStatus.REJECTED)
    )

    job.status = JobStatus.ASSIGNED
    job.selected_application = application
    job.save(update_fields=["status", "selected_application"])

    return job, application

