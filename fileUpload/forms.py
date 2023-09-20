from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User

class SignupForm(UserCreationForm):
	class Meta:
		model = User
		fields = ['first_name', 'last_name', 'email', 'password1', 'password2']
		
		widgets = {
		  'first_name': forms.TextInput(attrs={
		    'class': 'w-full py-4 px-6 rounded-sm bg-blue-100 text-xl',
		    'placeholder': 'Eg. John...'
		  }),
		  'last_name': forms.TextInput(attrs={
		    'class': 'w-full py-4 px-6 rounded-lg bg-grey-200',
		    'placeholder': 'Eg. Smith...'
		  }),
		  'email': forms.EmailInput(attrs={
		    'class': 'w-full py-4 px-6 rounded-lg bg-darkGreyBlue',
		    'placeholder': 'Eg. John...'
		  }),
		  'password1': forms.PasswordInput(attrs={
		    'class': 'w-full py-4 px-6 rounded-lg bg-darkGreyBlue',
		    'placeholder': 'Enter A Password'
		  }),
		  'password2': forms.PasswordInput(attrs={
		    'class': 'w-full py-4 px-6 rounded-lg bg-darkGreyBlue',
		    'placeholder': 'Eg. Confirm your Password'
		  }),
		  
		}

