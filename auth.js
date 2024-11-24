document.addEventListener('DOMContentLoaded', function () {
    // Attach event listener for the submit button
    document.getElementById('submitBtn').addEventListener('click', function () {
        // Collect form data
        const userForm = document.getElementById('userForm');
        const formData = new FormData(userForm);

        // Convert FormData to JSON
        const data = {
            user_id: formData.get('user_id'),
            username: formData.get('username'),
            password: formData.get('password'),
            is_active: formData.get('is_active') === 'true', // Convert string to boolean
        };

        // Validate checkbox
        const termsAccepted = document.getElementById('form2Example3cg').checked;
        if (!termsAccepted) {
            alert('Please accept the Terms of Service to continue.');
            return;
        }

        // Send POST request
        fetch('https://job-task-muskan-digital.onrender.com/auth/custom-users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    alert('User registered successfully!');
                    userForm.reset();
                } else {
                    return response.json().then(error => {
                        alert(`Error: ${error.detail || 'Something went wrong!'}`);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    });
});



// Login data
document.addEventListener('DOMContentLoaded', function () {
    // Define the login function
    const UserLoginForms = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        
        // Collect form data
        const loginForm = document.getElementById('loginForm');
        const formData = new FormData(loginForm);

        // Convert FormData to JSON
        const data = {
            user_id: formData.get('user_id'), // Ensure input field has name="user_id"
            password: formData.get('password'), // Ensure input field has name="password"
        };

        console.log("Collected Data:", data); // Debugging to ensure data collection works

        // Validate if fields are not empty
        if (!data.user_id || !data.password) {
            alert('Please fill in all fields!');
            return;
        }

        // Send POST request to login API
        fetch('https://job-task-muskan-digital.onrender.com/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send JSON data
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse JSON response if request is successful
                } else {
                    return response.json().then(error => {
                        throw new Error(error.message || 'Invalid credentials!');
                    });
                }
            })
            .then(responseData => {
                // Assuming the API returns these fields in the response
                localStorage.setItem("authToken", responseData.token);
                localStorage.setItem("userId", responseData.user_id);
                localStorage.setItem("isAdmin", responseData.is_admin);

                alert('Login successful!');
                window.location.href = './index.html'; // Redirect to homepage
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`Error: ${error.message || 'An error occurred. Please try again.'}`);
            });
    };

    // Attach the form submit event listener to the login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', UserLoginForms);
    }
});

// Attach the LoginForm function to the form submit event
const handleLogout = () => {
    const token = localStorage.getItem("authToken");
    const is_admin = localStorage.getItem("isAdmin");
    const user_id = localStorage.getItem("userId");
    console.log("Logout token", token);
    if(!token || !is_admin){
        alert("Token not found Please login")
    }
    // Send POST request to logout API
    fetch("https://job-task-muskan-digital.onrender.com/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Attach token in Authorization header
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          // Remove auth data from localStorage on successful logout
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          if (is_admin) {
            localStorage.removeItem("isAdmin");
          }

  
          // Redirect to login page
          window.location.href = "./login.html";
        } else {
          // Handle errors if the response is not OK
          console.error("Logout failed");
        }
      })
      .catch((err) => {
        console.log("Logout error", err);
      });
  };
  