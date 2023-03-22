from django.contrib import admin

# Register your models here.

from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
        list_display = ("first_name", "last_name", "position", "hire_date")

admin.site.register(Employee, EmployeeAdmin)