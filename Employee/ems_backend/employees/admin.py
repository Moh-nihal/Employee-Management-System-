from django.contrib import admin

from .models import DynamicFormField,Employee
admin.site.register(DynamicFormField)
admin.site.register(Employee)