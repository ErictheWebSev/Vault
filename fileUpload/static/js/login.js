document.addEventListener("DOMContentLoaded", () => {
const errormsg = document.getElementById('errors');
const form = document.getElementById('loginForm');
const loader = document.getElementById('loader');
const btnMsg = document.getElementById('btn-msg');


function validateForm() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();


  
  if (username === '' || password === '' ) {
    errormsg.textContent = 'Fields cannot be empty';

    return false;
  }
  
  return true;
}

function loginUser(formData) {
  fetch('/login/', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    btnMsg.textContent = 'Sign In';
    if (data.success) {
      alert(data.message);
      window.location.href = '/';
    } else {
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
    btnMsg.textContent = 'Signing in...';
    const formElement = e.target;
    const formData = new FormData(formElement);
    loginUser(formData)
    e.target.reset();
  }
});

});