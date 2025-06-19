from django.contrib import admin
from .models import Order
from .models import CompletedOrder
from .models import Item
from .models import AddItem
from .models import Location

class LocationAdmin(admin.ModelAdmin):
    list_display = ('id','name','tables','taken','avail','guests','staff','waiting')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','location','table','guests','total','finalized_list','completed')

class CompletedOrderAdmin(admin.ModelAdmin):
    list_display = ('id','location','table','guests','total','finalized_list','payment_details','completed')

class ItemAdmin(admin.ModelAdmin):
    list_display = ('id','description','recipe','cost','price')

class AddItemAdmin(admin.ModelAdmin):
    list_display = ('id','order','item','description','modification','unit_price','qty','price','guest')


# Register your models here.


admin.site.register(Location,LocationAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(CompletedOrder,CompletedOrderAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(AddItem,AddItemAdmin)