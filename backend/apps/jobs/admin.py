from django.contrib import admin

from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "client",
        "category",
        "city",
        "district",
        "status",
        "created_at",
    )
    list_filter = ("status", "category", "city", "district", "created_at")
    search_fields = (
        "title",
        "description",
        "client__phone",
        "client__full_name",
        "address_text",
    )
    autocomplete_fields = ("client", "category", "selected_application")
    list_select_related = ("client", "category", "selected_application")
    ordering = ("-created_at", "-id")
    list_per_page = 25
    readonly_fields = ("created_at", "updated_at")
