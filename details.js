const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const names = urlParams.get('name');
const description = urlParams.get('description');
const price = urlParams.get('price');
const image = urlParams.get('image');

// Populate the details page with the fetched data
document.getElementById('module-name').textContent = names;
document.getElementById('module-description').textContent = description;
document.getElementById('module-price').textContent = price;
document.getElementById('module-image').src = image;