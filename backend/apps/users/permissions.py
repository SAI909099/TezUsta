from rest_framework.permissions import BasePermission


class IsClient(BasePermission):
    message = "Only clients can perform this action."

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and user.is_authenticated and user.role == "client")


class IsMaster(BasePermission):
    message = "Only masters can perform this action."

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and user.is_authenticated and user.role == "master")

