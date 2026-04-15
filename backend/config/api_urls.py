from django.urls import include, path

urlpatterns = [
    path("", include("apps.categories.urls")),
    path("", include("apps.jobs.urls")),
    path("", include("apps.applications.urls")),
]
