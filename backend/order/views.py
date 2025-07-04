from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import OrderSerializer
from .serializers import CompletedOrderSerializer
from .serializers import ItemSerializer
from .serializers import AddItemSerializer
from .serializers import LocationSerializer
from .models import Order
from .models import CompletedOrder
from .models import Item
from .models import AddItem
from .models import Location

# Create your views here.

class LocationView(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

class CompletedOrderView(viewsets.ModelViewSet):
    serializer_class = CompletedOrderSerializer
    queryset = CompletedOrder.objects.all()

class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class AddItemView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = AddItemSerializer
    queryset = AddItem.objects.all()
    def get_queryset(self):
        queryset = super().get_queryset()
        order_id = self.request.query_params.get("order", None)
        if order_id is not None:
            queryset = queryset.filter(order__id=order_id)
        return queryset


# Create your views here.from django.shortcuts import render