from django.contrib import admin

from .models import MasterProfile, WalletTransaction


@admin.register(MasterProfile)
class MasterProfileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "category",
        "city",
        "district",
        "experience_years",
        "rating_avg",
        "rating_count",
        "is_verified",
        "wallet_balance",
        "free_contact_credits",
    )
    list_filter = ("category", "city", "is_verified")
    search_fields = ("user__phone", "user__full_name", "city", "district")
    autocomplete_fields = ("user", "category")
    list_select_related = ("user", "category")
    ordering = ("-created_at", "-id")
    list_per_page = 25
    readonly_fields = ("created_at", "updated_at")


@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "master",
        "type",
        "amount",
        "currency",
        "related_job",
        "related_application",
        "created_at",
    )
    list_filter = ("type", "currency", "created_at")
    search_fields = (
        "master__user__phone",
        "master__user__full_name",
        "description",
    )
    autocomplete_fields = ("master", "related_job", "related_application")
    list_select_related = (
        "master",
        "master__user",
        "related_job",
        "related_application",
    )
    ordering = ("-created_at", "-id")
    list_per_page = 25
    readonly_fields = ("created_at",)
