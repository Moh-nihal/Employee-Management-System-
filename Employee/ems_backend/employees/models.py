from django.db import models

class DynamicFormField(models.Model):
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50)  
    order = models.IntegerField()

class Employee(models.Model):
    data = models.JSONField()  
