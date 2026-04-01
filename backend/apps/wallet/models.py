from django.db import models


class TransactionType(models.TextChoices):
    BONUS = "bonus", "Bonus"
    UNLOCK_CHARGE = "unlock_charge", "Unlock Charge"
    TOPUP = "topup", "Top Up"
    REFUND = "refund", "Refund"


class MasterProfile(models.Model):
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
        related_name="master_profile",
        limit_choices_to={"role": "master"},
    )
    category = models.ForeignKey(
        "categories.Category",
        on_delete=models.SET_NULL,
        related_name="master_profiles",
        null=True,
        blank=True,
    )
    city = models.CharField(max_length=100, db_index=True)
    district = models.CharField(max_length=120, db_index=True)
    experience_years = models.PositiveSmallIntegerField(default=0)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="masters/avatars/", blank=True, null=True)
    rating_avg = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    rating_count = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False, db_index=True)
    wallet_balance = models.PositiveBigIntegerField(
        default=0,
        help_text="Stored in UZS minor units.",
    )
    free_contact_credits = models.PositiveIntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=["category", "is_verified"]),
            models.Index(fields=["city", "district"]),
        ]

    def __str__(self):
        return self.user.full_name or self.user.phone


class WalletTransaction(models.Model):
    master = models.ForeignKey(
        "wallet.MasterProfile",
        on_delete=models.CASCADE,
        related_name="transactions",
    )
    type = models.CharField(max_length=20, choices=TransactionType.choices, db_index=True)
    amount = models.PositiveBigIntegerField(help_text="Stored in UZS minor units.")
    currency = models.CharField(max_length=3, default="UZS")
    description = models.CharField(max_length=255, blank=True)
    related_job = models.ForeignKey(
        "jobs.Job",
        on_delete=models.SET_NULL,
        related_name="wallet_transactions",
        null=True,
        blank=True,
    )
    related_application = models.ForeignKey(
        "applications.JobApplication",
        on_delete=models.SET_NULL,
        related_name="wallet_transactions",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=["master", "created_at"]),
            models.Index(fields=["type", "created_at"]),
        ]

    def __str__(self):
        return f"{self.master} - {self.type} - {self.amount}"
