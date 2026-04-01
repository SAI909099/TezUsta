from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import UserManager


class UserRole(models.TextChoices):
    CLIENT = "client", "Client"
    MASTER = "master", "Master"
    ADMIN = "admin", "Admin"


class User(AbstractUser):
    username = None
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, unique=True, db_index=True)
    full_name = models.CharField(max_length=255)
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.CLIENT,
        db_index=True,
    )
    is_phone_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = ["full_name"]

    objects = UserManager()

    class Meta:
        ordering = ("id",)
        indexes = [
            models.Index(fields=["role", "is_active"]),
        ]

    def __str__(self):
        return self.full_name or self.phone

    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        return self.full_name
