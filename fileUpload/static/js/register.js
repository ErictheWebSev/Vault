document.addEventListener("DOMContentLoaded", () => {
const errormsg = document.getElementById('errors');
const form = document.getElementById('registrationForm');
const loader = document.getElementById('loader');
const btnMsg = document.getElementById('btn-msg');


function validateForm() {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const password2 = document.getElementById('password2').value.trim();
  
  function validateEmail(email) {
  // Simple email validation using regular expression
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePasswordComplexity(password) {
  // Check if password contains alphabetic characters, numbers, and symbols
  let alphaRegex = /[a-zA-Z]/;
  let numericRegex = /\d/;
  //var symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  return alphaRegex.test(password) && numericRegex.test(password);
}
    if (!validateEmail(email)) {
    
    errormsg.innerHTML = "Invalid email address.";
    return false;
  }

  
  if (username === '' || email ==='' || password === '' || password2 === '') {
    errormsg.textContent = 'All fields cannot be empty';

    return false;
  }
  
  if (password != password2) {
    errormsg.textContent = 'Passwords do not match';
    return false
  }
  
  if (password.length < 6) {
    errormsg.innerHTML = "Password must be at least 6 characters long.";
    return false;
  }
  
  if (!validatePasswordComplexity(password)) {
    errormsg.innerHTML = "Password must contain alphanumerics.";
    return false;
  }
  
  return true;
}

function registerUser(formData) {
  fetch('/register/', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    btnMsg.textContent = 'Sign Up';
    if (data.success == 'Registration Successful') {
      alert('Registration Successful');
      window.location.href = '/';
    } else {
      alert('Failed' + data.message);
      errormsg.textContent = data.message;
    }
  })
  .catch(error => {
    alert('error occured' + error);
    errormsg.textContent = error;
  });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
  if (validateForm()) {
    btnMsg.textContent = 'Signing Up...';
    const formElement = e.target;
    const formData = new FormData(formElement);
    registerUser(formData)
    e.target.reset();
  }
});

});