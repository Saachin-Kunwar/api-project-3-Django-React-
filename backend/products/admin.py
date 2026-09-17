from django.contrib import admin
from .models import Product
# Register your models here

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=(
        "id","name","price","stock","owner","created_at",
    )

    list_filter=(
        "owner",
    )

    search_fields=(
        "name",
        "description",
    )


