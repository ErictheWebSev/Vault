from django.db import models
from django.contrib.auth.models import  User


class Category(models.Model):
	name = models.CharField(max_length=100)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	
	class Meta:
		verbose_name_plural = 'Categories'
		unique_together = ['name', 'user']
	
	
	def __str__(self):
		return str(self.name)
		

class FileUpload(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
	file_name = models.CharField(max_length=255)
	file_size = models.PositiveIntegerField()
	file_type = models.CharField(max_length=40)
	file = models.FileField(upload_to='Files')
	date_uploaded = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return str(self.file)
