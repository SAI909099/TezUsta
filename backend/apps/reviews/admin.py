from django.contrib import admin

from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "job", "client", "master", "rating", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = (
        "job__title",
        "client__phone",
        "client__full_name",
        "master__phone",
        "master__full_name",
    )
    autocomplete_fields = ("job", "client", "master")
    list_select_related = ("job", "client", "master")
    ordering = ("-created_at", "-id")
    list_per_page = 25
    readonly_fields = ("created_at",)
