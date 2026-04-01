from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    list_display = (
        "id",
        "phone",
        "full_name",
        "role",
        "is_phone_verified",
        "is_active",
        "is_staff",
        "date_joined",
    )
    list_filter = (
        "role",
        "is_phone_verified",
        "is_active",
        "is_staff",
        "is_superuser",
    )
    search_fields = ("phone", "full_name")
    ordering = ("-date_joined", "-id")
    list_per_page = 25
    readonly_fields = ("last_login", "date_joined")

    fieldsets = (
        (None, {"fields": ("phone", "password")}),
        (
            "Personal info",
            {"fields": ("full_name", "role", "email", "first_name", "last_name")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_phone_verified",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "phone",
                    "full_name",
                    "role",
                    "is_phone_verified",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
