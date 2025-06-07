from django.db import models

# Create your models here.

class Location(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    tables = models.IntegerField()
    taken = models.IntegerField()
    avail = models.IntegerField()
    guests = models.IntegerField()
    staff = models.IntegerField()
    waiting = models.IntegerField()

    def _str_(self):
        return self.id

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    table = models.IntegerField()
    guests = models.IntegerField()
    total = models.FloatField()
    finalized_list = models.JSONField()
    completed = models. BooleanField()

    def _str_(self):
        return self.id

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=120,default="")
    recipe = models.TextField()
    cost = models.FloatField()
    price = models.FloatField()

    def _str_(self):
        return self.id

class AddItem(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    description = models.CharField(max_length=120,default="")
    recipe = models.TextField()
    unit_price = models.FloatField()
    qty = models.IntegerField()
    price = models.FloatField()
    guest = models.IntegerField(default=1)

    def _str_(self):
        return self.id