from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError


class Type(models.Model):
    name = models.CharField(max_length=256, default='unnamed type')

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=256, default='unnamed category')
    type = models.ForeignKey(Type, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=256, default='unnamed subcategory')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Status(models.Model):
    name = models.CharField(max_length=256, default='unnamed status')

    def __str__(self):
        return self.name


class MoneyTransfer(models.Model):
    transfer_type = models.ForeignKey(Type, on_delete=models.SET_NULL,
                                      null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,
                                 null=True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL,
                                    null=True)
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True)

    comment = models.CharField(max_length=256, blank=True)
    money_sum = models.BigIntegerField()
    date = models.DateField(default=timezone.now)

    def clean(self):
        if self.category != self.subcategory.category:
            raise ValidationError('Invalid category or subcategory')
        elif self.transfer_type != self.category.type:
            raise ValidationError('Invalid transfer type or category')
    
        return super().clean()

