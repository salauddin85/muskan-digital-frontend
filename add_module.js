const uploadPreset = 'image_upload_cildank';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('module-form');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');

    // Fetch user data when the page is loaded
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('https://job-task-muskan-digital.onrender.com/auth/custom-users/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            const users = await response.json();

            if (response.ok) {
                // Populate the dropdown menu with user data
                users.forEach(user => {
                    const li = document.createElement('li');
                    const button = document.createElement('button');
                    button.classList.add('dropdown-item');
                    button.setAttribute('type', 'button');
                    button.textContent = `${user.user_id} - ${user.username || 'No Username'}`;
                    
                    button.setAttribute('data-user-id', user.id);

                    button.addEventListener('click', function () {
                        document.getElementById('selected-user-id').value = user.id;
                        console.log(`Selected User ID: ${user.id} - ${user.username}`);
                    });

                    li.appendChild(button);
                    userDropdownMenu.appendChild(li);
                });
            } else {
                alert('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while fetching users');
        }
    };

    fetchUsers();

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const moduleName = document.getElementById('module_name').value;
        const modulePrice = document.getElementById('module_price').value;
        const moduleDescription = document.getElementById('description').value;
        const image = document.getElementById('image').files[0];
        const userId = document.getElementById('selected-user-id').value;

        if (!moduleName || !modulePrice || !moduleDescription || !image || !userId) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            // Step 1: Upload the image to Cloudinary
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('file', image);
            cloudinaryFormData.append('upload_preset', uploadPreset);

            const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dnzqmx8nw/image/upload', {
                method: 'POST',
                body: cloudinaryFormData,
            });

            const cloudinaryData = await cloudinaryResponse.json();

            if (!cloudinaryResponse.ok) {
                throw new Error('Image upload to Cloudinary failed');
            }

            const imageUrl = cloudinaryData.secure_url;

            // Step 2: Submit the form data with the image URL to your backend
            const formData = new FormData();
            formData.append('name', moduleName);
            formData.append('price', modulePrice);
            formData.append('description', moduleDescription);
            formData.append('image', imageUrl); // Use the Cloudinary URL
            formData.append('user', userId);

            const token = localStorage.getItem('authToken');
            const response = await fetch('https://job-task-muskan-digital.onrender.com/auth/modules/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert('Module added successfully!');
                form.reset();
            } else {
                console.error('Error Response:', data);
                alert('Failed to add module: ' + (data.detail || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while adding the module.');
        }
    });
});
