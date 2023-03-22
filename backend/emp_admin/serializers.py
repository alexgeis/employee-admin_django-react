# import serializers from the REST framework
from rest_framework import serializers

# import model(s)
from .models import Employee

# create a serializer class
class EmployeeSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = Employee
		fields = ('id', 'first_name', 'last_name', 'position', 'hire_date')