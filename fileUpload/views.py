from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate,logout
from django.http import JsonResponse
from .models import FileUpload, Category
from django.db import models



def index(request):
	return render(request, 'index.html')


@login_required(login_url='login')
def dashboard(request):
  return render(request, 'dashboard.html')





@login_required(login_url='login')
def upload_file(request):
    if request.method == 'POST':
        try:
            uploaded_file = request.FILES['file']
            user = request.user
            file_name = uploaded_file.name
            file_type = uploaded_file.content_type
            file_size = uploaded_file.size

            # Get or create the default category
            default_category, created = Category.objects.get_or_create(user=user, name='Regular')

            # Check if the category was created, and if so, assign it
            if created:
                default_category.save()

            # Create the FileUpload instance with the correct category
            file = FileUpload(user=user, file=uploaded_file, category=default_category, file_name=file_name, file_size=file_size, file_type=file_type)
            file.save()

            return JsonResponse({'success': True, 'message': 'File uploaded successfully to Regular category.', 'file_name': file_name, 'file_size': file_size, 'file_type': file_type})

        except KeyError:
            return JsonResponse({'success': False, 'message': 'No file provided.'})

    context = {
        'user': request.user,
    }

    return render(request, 'fileUpload.html', context)

@login_required(login_url='login')
def create_category(request):
		
	if request.method == 'POST':
		category_name = request.POST['category_name']
		
		if category_name:
			user = request.user
			new_category = Category.objects.create(user=user, name=category_name)
			return JsonResponse({'success': True, 'message': 'created', 'category_name':
			category_name})
		else:
			return JsonResponse({'success': False, 'message': 'Field required'})
	if request.method == 'GET':
		
		categories = Category.objects.filter(user=request.user).annotate(file_count=models.Count('fileupload'))
		
		context = {
			'categories': categories,
			'user': request.user,
		}
			
	return render(request, 'category.html', context)

@login_required(login_url='login')
def category_detail(request, category_id):
  pass


@login_required(login_url='login')
def manage_files(request):
  files = FileUpload.objects.filter(user=request.user).order_by('-date_uploaded')
  user = request.user
  
  context = {
    'files': files,
    'user': user
  }
  return render(request, 'file-list.html', context)


def file_detail(request, file_id):
	file = get_object_or_404(FileUpload, id=file_id)
	
	related_file = FileUpload.objects.filter(category=file.id).exclude(id=file_id)
	
	context = {
		'file': file,
		'related_file': related_file,
	}
	
	
	return render(request, 'file-detail.html', context)
	


#######  Authentication ######
def signup(request):
	if request.method == 'POST':
		username = request.POST['username']
		email = request.POST['email']
		password = request.POST['password']
		password2 = request.POST['password2']
		
		if User.objects.filter(username=username).exists():
			return JsonResponse({'success': 'False', 'message': 'Sorry username already exists...Try a different username'})
		else:
			user = User.objects.create_user(username=username, email=email, password=password)
			user.save()
			login(request, user)
			return JsonResponse({'success': 'Registration Successful'})
			
	if request.user.is_authenticated:
		return redirect('dashboard')
		
	return render(request, 'register.html')
	

def signIn(request):
  if request.method == 'POST':
    username = request.POST['username']
    password = request.POST['password']
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
      login(request, user)
      return JsonResponse({'success': True, 'message': 'Login Successful'})
    else:
      return JsonResponse({'success': False, 'message': 'Invalid Credentials'})
  if request.user.is_authenticated:
  	return redirect('dashboard')
  return render(request, 'login.html')
 


def logout_user(request):
	if request.method == 'POST':
		logout(request)
		return redirect('home')
	return render(request, 'logout.html')