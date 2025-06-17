from django.contrib import admin
from django.forms import ModelForm
from .models import Type, Category, SubCategory, Status, MoneyTransfer


@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type')
    list_filter = ('type',)
    search_fields = ('name',)


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category')
    list_filter = ('category',)
    search_fields = ('name',)


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


class MoneyTransferForm(ModelForm):
    class Meta:
        model = MoneyTransfer
        fields = '__all__'


@admin.register(MoneyTransfer)
class MoneyTransferAdmin(admin.ModelAdmin):
    form = MoneyTransferForm
    list_display = ('id', 'transfer_type', 'status', 'category', 'subcategory', 'money_sum', 'date')
    list_filter = ('transfer_type', 'status', 'category', 'subcategory', 'date')
    search_fields = ('comment',)
    autocomplete_fields = ('transfer_type', 'category', 'subcategory', 'status')
    ordering = ('-date',)
