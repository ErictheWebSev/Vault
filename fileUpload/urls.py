from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='home'),
	path('category/', views.create_category, name='category'),
	path('category/<int:category_id>', views.category_detail, name='category-detail'),
	path('dashboard/', views.dashboard, name='dashboard'),
	
	#files
	path('upload/', views.upload_file, name='upload'),
	path('manage_files/', views.manage_files, name='manage_files'),
	path('file_detail/<int:file_id>', views.file_detail, name='file-detail'),
	path('delete-file/<int:file_id>', views.delete_file, name='file-delete'),

	#authentication
	path('register/', views.signup, name='register'),
	path('login/', views.signIn, name='login'),
	path('logout/', views.logout_user, name='logout')
]