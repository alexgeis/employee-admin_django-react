from django.db import models

# Create your models here.

# class Manager(models.Model):
#     first_name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)

#     def __str__(self):
#         return f"{self.first_name} {self.last_name} - Manager" 


class Employee(models.Model):
    # manager = models.ForeignKey(Manager, on_delete=models.DO_NOTHING)

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    position = models.CharField(max_length=100)
    hire_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.position}"



