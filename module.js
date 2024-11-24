// Fetch the data from the API
const fetchModules = async () => {
    const token = localStorage.getItem('authToken'); // Replace with your actual token
    try {
        const response = await fetch('https://job-task-muskan-digital.onrender.com/auth/modules/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`, // Use the token in the Authorization header
            },
        });

        const data = await response.json();

        if (response.ok) {
            // Call the function to populate the cards
            populateCards(data);
        } else {
            console.error('Error fetching modules:', data);
            alert('Failed to fetch modules.');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        // alert('An error occurred while fetching modules.');
    }
};

// Function to dynamically populate the cards
const populateCards = (modules) => {
    const container = document.querySelector('#cards-container .row');

    modules.forEach(module => {
        // Ensure the image property exists and process it
        const image = module.image || ''; // Fallback to empty string if image is undefined
        const correctedImageUrl = image.replace("image/upload/", "");

        // Split the description into words and slice the first 10 words
        const descriptionWords = module.description ? module.description.split(' ') : [];
        const slicedDescription = descriptionWords.slice(0, 10).join(' ') + '...';

        // Generate the URL with query parameters
        const detailsURL = `details.html?id=${module.id}&name=${encodeURIComponent(module.name)}&description=${encodeURIComponent(module.description)}&price=${module.price}&image=${encodeURIComponent(correctedImageUrl)}`;

        const cardHTML = `
            <div class="col-lg-3 col-md-6 col-12">
    <div class="card mt-3">
        <img src="${correctedImageUrl}" class="card-img-top" alt="${module.name}" />
        <div class="card-body">
            <h5 class="card-title">${module.name}</h5>
            <p class="card-text">${slicedDescription}</p>
            <p class="card-text"><strong>Price:</strong> $${module.price}</p>
            <a href="${detailsURL}" class="btn btn-primary" data-mdb-ripple-init>Details</a>
        </div>
    </div>
</div>

        `;
        container.innerHTML += cardHTML; // Append the new card to the container
    });
};

// Call the function to fetch and display the data when the page loads
fetchModules();
