from django.contrib import admin

from .models import JobApplication


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "job",
        "master",
        "status",
        "applied_at",
        "selected_at",
        "contact_unlocked_at",
    )
    list_filter = ("status", "applied_at")
    search_fields = ("job__title", "master__phone", "master__full_name")
    autocomplete_fields = ("job", "master")
    list_select_related = ("job", "master")
    ordering = ("-applied_at", "-id")
    list_per_page = 25
    readonly_fields = ("applied_at", "selected_at", "contact_unlocked_at")
