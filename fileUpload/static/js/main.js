document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById('menu-icon')
  const closeCon = document.getElementById('close-con')
  const closeIcon = document.getElementById('close-icon')
  const sideBar = document.querySelector('.sidebar')
  
  const uploadIcon = document.getElementById('icon-up');
  uploadIcon.addEventListener('click', () => {
    window.location.href = '/upload/';
  })
  
  closeIcon.style.display = 'none';
  
  menuIcon.addEventListener('click', () => {
    sideBar.classList.toggle('open');
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'inline';
    })
    
  closeIcon.addEventListener('click', () => {
    sideBar.classList.toggle('open');
    closeIcon.style.display = 'none';
    menuIcon.style.display = 'inline';
  })
  
})