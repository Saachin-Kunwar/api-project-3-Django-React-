from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self,serializer):
        serializer.save(owner=self.request.user)