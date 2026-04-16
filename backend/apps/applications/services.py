from django.conf import settings
from django.db import transaction
from django.utils import timezone

from apps.wallet.models import MasterProfile, TransactionType, WalletTransaction

from .models import ApplicationStatus, JobApplication


@transaction.atomic
def unlock_client_contact(*, application_id: int, master_user):
    """
    Unlock client contact for the selected master.
    Deducts free credit first, otherwise wallet balance (and logs a transaction).
    Idempotent: if already unlocked, returns current state without charging again.
    """
    application = (
        JobApplication.objects.select_for_update()
        .select_related("job", "job__client", "master")
        .get(id=application_id)
    )

    if application.master_id != master_user.id:
        raise PermissionError("not_application_master")

    job = application.job
    if job.selected_application_id != application.id:
        raise PermissionError("not_selected_master")

    if application.status == ApplicationStatus.CONTACT_UNLOCKED:
        return application, None

    profile = (
        MasterProfile.objects.select_for_update()
        .select_related("user")
        .get(user_id=master_user.id)
    )

    price = int(getattr(settings, "CONTACT_UNLOCK_PRICE", 0))

    used_wallet = False
    if profile.free_contact_credits > 0:
        profile.free_contact_credits -= 1
        profile.save(update_fields=["free_contact_credits"])
    else:
        if price <= 0:
            # In dev/MVP, allow unlock without balance when price not configured.
            # Still explicit so production can set a real price.
            pass
        elif profile.wallet_balance < price:
            raise ValueError("insufficient_funds")
        else:
            profile.wallet_balance -= price
            profile.save(update_fields=["wallet_balance"])
            used_wallet = True

    if used_wallet and price > 0:
        WalletTransaction.objects.create(
            master=profile,
            type=TransactionType.UNLOCK_CHARGE,
            amount=price,
            currency="UZS",
            description="Contact unlock charge",
            related_job=job,
            related_application=application,
        )

    application.status = ApplicationStatus.CONTACT_UNLOCKED
    application.contact_unlocked_at = timezone.now()
    application.save(update_fields=["status", "contact_unlocked_at"])

    return application, profile

