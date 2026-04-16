from django.urls import include, path

urlpatterns = [
    path("", include("apps.categories.urls")),
    path("", include("apps.jobs.urls")),
    path("", include("apps.applications.urls")),
    path("", include("apps.otp_auth.urls")),
    path("", include("apps.users.urls")),
    path("", include("apps.reviews.urls")),
]
