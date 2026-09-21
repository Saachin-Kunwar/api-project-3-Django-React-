# from rest_framework.viewsets import ModelViewSet
# from .models import Product
# from .serializers import ProductSerializer


# class ProductViewSet(ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer

#     def perform_create(self,serializer):
#         serializer.save(owner=self.request.user)

# from rest_framework.viewsets import ModelViewSet
# from rest_framework.authentication import SessionAuthentication
# from rest_framework.permissions import IsAuthenticated
# from .models import Product
# from .serializers import ProductSerializer

# class ProductViewSet(ModelViewSet):
#     queryset= Product.objects.all()
#     serializer_class= ProductSerializer

#     authentication_class= [SessionAuthentication]
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# custom permission
# from rest_framework.viewsets import ModelViewSet
# from rest_framework.authentication import SessionAuthentication
# from rest_framework.permissions import IsAuthenticated

# from .models import Product
# from .serializers import ProductSerializer
# from .permissions import IsOwner

# class ProductViewSer(ModelViewSet):
#     queryset= Product.objects.all()
#     serializer_class= ProductSerializer

#     authentication_classes=[SessionAuthentication]

#     permission_classes=[
#         IsAuthenticated,
#         IsOwner,
#     ]

#     def perform_create(self,serializer):
#         serializer.save(owner=self.request.user)
        
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .models import Product
from .serializers import ProductSerializer
from .permissions import IsOwner


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in [
            "update",
            "partial_update",
            "destroy",
        ]:
            permission_classes = [
                IsAuthenticated,
                IsOwner,
            ]
        else:
            permission_classes = [
                IsAuthenticated,
            ]

        return [
            permission()
            for permission in permission_classes
        ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)