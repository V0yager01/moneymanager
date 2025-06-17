from rest_framework import filters
from rest_framework import viewsets


from .serializers import (MoneyTransferSerializer,
                          CategorySerializer,
                          SubCategorySerializer,
                          TypeSerializer,
                          StatusSerializer)
from .models import MoneyTransfer, Category, SubCategory, Type, Status


class MoneyTransferViewSet(viewsets.ModelViewSet):
    serializer_class = MoneyTransferSerializer
    queryset = MoneyTransfer.objects.all()


class TypeViewSet(viewsets.ModelViewSet):
    serializer_class = TypeSerializer
    queryset = Type.objects.all()
    filter_backends = [filters.SearchFilter]


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['type__id']


class SubCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['category__id']


class StatusViewSet(viewsets.ModelViewSet):
    serializer_class = StatusSerializer
    queryset = Status.objects.all()
