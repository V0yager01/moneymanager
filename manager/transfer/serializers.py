
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import MoneyTransfer, Category, SubCategory, Type, Status


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class MoneyTransferSerializer(serializers.ModelSerializer):
    transfer_type_id = serializers.PrimaryKeyRelatedField(source='transfer_type', queryset=Type.objects.all(), write_only=True)
    transfer_type = TypeSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(source='category', queryset=Category.objects.all(), write_only=True)
    category = CategorySerializer(read_only=True)
    subcategory_id = serializers.PrimaryKeyRelatedField(source='subcategory', queryset=SubCategory.objects.all(), write_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    status_id = serializers.PrimaryKeyRelatedField(source='status', queryset=Status.objects.all(), write_only=True)
    status = StatusSerializer(read_only=True)

    def validate(self, attrs):
        category = attrs.get('category')
        subcategory = attrs.get('subcategory')
        transfer_type = attrs.get('transfer_type')
        if category and transfer_type:
            if transfer_type != category.type:
                raise ValidationError('Invalid transfer type or category')

        if category and subcategory:
            if category != subcategory.category:
                raise ValidationError('Invalid category or subcategory')

        return attrs

    class Meta:
        model = MoneyTransfer
        fields = '__all__'
