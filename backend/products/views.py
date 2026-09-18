# from rest_framework.viewsets import ModelViewSet
# from .models import Product
# from .serializers import ProductSerializer


# class ProductViewSet(ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer

#     def perform_create(self,serializer):
#         serializer.save(owner=self.request.user)

from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(ModelViewSet):
    queryset= Product.objects.all()
    serializer_class= ProductSerializer

    authentication_class= [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
