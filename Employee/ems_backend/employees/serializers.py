from rest_framework import serializers
from .models import DynamicFormField, Employee

class DynamicFormFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = DynamicFormField
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'