from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from config.api_mixins import SuccessEnvelopeMixin

from .models import Category
from .serializers import CategoryListSerializer


class CategoryListAPIView(SuccessEnvelopeMixin, ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CategoryListSerializer

    def get_queryset(self):
        return Category.objects.filter(is_active=True).order_by("name")

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return self.success_response(
            response.data,
            status=response.status_code,
            headers=response.headers,
        )
