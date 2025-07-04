from rest_framework import serializers
from .models import Order
from .models import CompletedOrder
from .models import Item
from .models import AddItem
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id','name','tables','taken','avail','guests','staff','waiting')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id','location','table','guests','total','finalized_list','completed')

class CompletedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedOrder
        fields = ('id','location','table','guests','total','finalized_list','payment_details','completed')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id','description','recipe','cost','price')

class AddItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddItem
        fields = ('id','order','item','description','modification','unit_price','qty','price','guest')
