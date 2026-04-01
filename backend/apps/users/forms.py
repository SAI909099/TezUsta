from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("phone", "full_name", "role", "is_phone_verified")


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = "__all__"
