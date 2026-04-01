from django.contrib import admin

from .models import OTPCode


@admin.register(OTPCode)
class OTPCodeAdmin(admin.ModelAdmin):
    @admin.display(boolean=True, description="Is expired", ordering="expires_at")
    def is_expired_display(self, obj):
        return obj.is_expired

    @admin.display(boolean=True, description="Is verified", ordering="verified_at")
    def is_verified_display(self, obj):
        return obj.is_verified

    list_display = (
        "id",
        "phone",
        "expires_at",
        "verified_at",
        "attempts",
        "created_at",
        "is_expired_display",
        "is_verified_display",
    )
    list_filter = ("verified_at", "expires_at", "created_at")
    search_fields = ("phone",)
    ordering = ("-created_at", "-id")
    list_per_page = 25
    readonly_fields = (
        "code_hash",
        "attempts",
        "expires_at",
        "verified_at",
        "created_at",
        "is_expired_display",
        "is_verified_display",
    )
