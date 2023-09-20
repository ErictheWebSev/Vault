document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('categoryForm');
  const msg = document.getElementById('msg');
    
    function createCategory(formData) {
      fetch('/category/', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        msg.textContent = `${data.category_name} created successfully`;
        setTimeout(() => {
          msg.textContent = '';
    }, 2000);
        addCategoryToList(data.category_name)
      } else {
       msg.textContent = ` Failed ${data.message}`;

        setTimeout(() => {
          msg.textContent = '';
    }, 2000);
      }
    })
    .catch(error => {
      console.log('error occured' + error);
    });
    }
    
    form.addEventListener("submit", (e) => {
    e.preventDefault();
      const formElement = e.target;
      const formData = new FormData(formElement);
      createCategory(formData)
      e.target.reset();
});


function addCategoryToList(categoryName) {
    const categoryList = document.getElementById('category-list');
    const a = document.createElement('a');
    a.href = '#';
    
    // Create a new list item element
    const listItem = document.createElement('div');
    listItem.classList.add('category-box')
     const h2 = document.createElement('h3');
     const span = document.createElement('span');
     span.classList.add('span')
     span.textContent = '0 File';
     h2.textContent = categoryName;
     h2.classList.add('h2');
    
  // Append the new category to the list
    listItem.appendChild(span);
    listItem.appendChild(h2);
    a.appendChild(listItem);
    categoryList.appendChild(listItem);
    
}
});