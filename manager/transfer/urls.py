from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (MoneyTransferViewSet,
                    CategoryViewSet,
                    TypeViewSet,
                    StatusViewSet,
                    SubCategoryViewSet)

transfer_router = DefaultRouter()

transfer_router.register(
    'transfer',
    MoneyTransferViewSet,
    basename='transfer'
)

transfer_router.register(
    'category',
    CategoryViewSet,
    basename='category'
)

transfer_router.register(
    'subcategory',
    SubCategoryViewSet,
    basename='subcategory'
)

transfer_router.register(
    'type',
    TypeViewSet,
    basename='type'
)

transfer_router.register(
    'status',
    StatusViewSet,
    basename='status'
)


app_name = 'transfer_api'

urlpatterns = [
    path('', include(transfer_router.urls), name='index'),
]
