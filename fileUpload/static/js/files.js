document.addEventListener("DOMContentLoaded", () => {
  
  const byte = document.querySelectorAll('.byte')
  
  byte.forEach(item => {
    const dataText = item.innerText
    const dataVal = parseFloat(dataText)
    item.innerText = formatBytes(dataVal)
    
  })
  
      // Function to format file size
function formatBytes(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

  const deleteBtns = document.querySelectorAll('.delete')
  
  deleteBtns.forEach(button => {
    const fileId = button.getAttribute('data-file-id')
    
    button.addEventListener("click", () => {
    fetch(`/delete-file/${fileId}`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error deleting the file.');
          throw new Error('Error deleting the file.');
        }
      })
      .then((result) => {
        if (result.success) {
          const fileBox = button.closest('.file-box');
      if (fileBox) {
        // Check if the file box exists
        fileBox.remove(); // Remove the file box
      } else {
        console.error('File box not found.');
      }

          console.log(result.message);
        } else {
          console.error(result.message);
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
    })
    
  })
function getCookie(name) {
 const value = `; ${document.cookie}`;
 const parts = value.split(`; ${name}=`);
 if (parts.length === 2) return parts.pop().split(';').shift();
    }
})