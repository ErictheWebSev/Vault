document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.file-input');
  const fileInput = document.getElementById('file')
  const form = document.getElementById('uploadForm')
  const msg = document.getElementById('msg')
  const fileName = document.getElementById('file-name')
  
  container.addEventListener("click", () =>{
    fileInput.click();
  });
  
  // Function to format file size
function formatBytes(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

  fileInput.addEventListener('change', () => {
    const fileSize = document.getElementById('file-size')
    const fileType = document.getElementById('file-type')
    const previewImg = document.getElementById('prevImg')
    const previewBox = document.querySelector('.preview')
    const icon = document.querySelector('.Ficon')
    const selectedFile = fileInput.files[0]
    
    if (selectedFile) {
      previewBox.classList.remove('hidden');
      fileName.textContent = selectedFile.name
      fileType.textContent = selectedFile.type
      fileSize.textContent = formatBytes(selectedFile.size)
      
  if (selectedFile.type.startsWith('image/')) {
        previewImg.classList.remove('hidden')
        previewImg.src = URL.createObjectURL(selectedFile);
        icon.classList.add('hidden')
      } else if (selectedFile.type.startsWith('audio/')) {
          previewImg.classList.add('hidden')
          icon.classList.remove('hidden')
          icon.innerHTML = '<i class="fas fa-file-audio"></i>';
      } else if (selectedFile.type.startsWith('video/')) {
          previewImg.src = ""
          previewImg.classList.add('hidden')
          icon.classList.remove('hidden')
          icon.innerHTML = '<i class="fas fa-file-video"></i>'
      } else if (selectedFile.type === 'application/pdf') {
        previewImg.classList.add('hidden')
        icon.classList.remove('hidden')
        icon.innerHTML = '<i class="fas fa-file-pdf"></i>'
        
      } else if (selectedFile.type === 'application/zip') {
        previewImg.classList.add('hidden')
        icon.classList.remove('hidden')
        icon.innerHTML = '<i class="fas fa-file-zipper"></i>';
      } else if (selectedFile.type.startsWith('text/')) {
        previewImg.classList.add('hidden')
        icon.classList.remove('hidden')
        icon.innerHTML = '<i class="fas fa-file-text"></i>'
        
      } else if (selectedFile.type === ''){
        previewImg.classList.add('hidden')
        icon.classList.remove('hidden')
        icon.innerHTML = '<i class="fas fa-file"></i>' 
        fileType.textContent = 'File type: Unavailable'
      } else {
        previewImg.classList.add('hidden')
        icon.classList.remove('hidden')
        icon.innerHTML = '<i class="fas fa-file"></i>' 
      }
    } else {
      previewBox.classList.add('hidden')
    }
  })
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    fetch('/upload/', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        msg.textContent = `Success: ${data.message}`;
        setTimeout(() => {
          msg.textContent = '';
    }, 2000);
      } else {
       msg.textContent = ` Failed: ${data.message}`;

        setTimeout(() => {
          msg.textContent = '';
    }, 2000);
      }
    })
    .catch(error => {
      console.log('error occured' + error);
    });
    });
});

