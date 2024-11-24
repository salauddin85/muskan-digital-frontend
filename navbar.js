


// Fetch navbar HTML and set up event listeners
fetch("navbar.html")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    return res.text();
  })
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    const navbarCollapse = document.getElementById('navbarButtonsExample');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    const collapseInstance = new mdb.Collapse(navbarCollapse);
    
    navbarToggler.addEventListener('click', function () {
        collapseInstance.toggle();
    });
    // });
    const token = localStorage.getItem("authToken");
    const navElement = document.getElementById("auth-element");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (token && token !== "undefined") {
      navElement.innerHTML += `
        <a href="#" id="logout" data-mdb-ripple-init type="button" class="btn btn-link px-3 me-2 fs-6" onclick="handleLogout()">
                    Logout
        </a>
      `;
    } 
    if (isAdmin) {
        
        navElement.innerHTML += `
          <a href="./add_module.html" data-mdb-ripple-init type="button" class="btn btn-link px-3 me-2 fs-6">
                    Add Moduls
            </a>
             
        `;
        
      }
      
    if(!token ||  token == "undefined") {
      navElement.innerHTML += `
        <a href="./login.html" data-mdb-ripple-init type="button" class="btn btn-link px-3 me-2 fs-6">
                    Login
                </a>
        <a href="./registration.html" data-mdb-ripple-init type="button" class="btn btn-primary me-3 fs-6">
                    Sign Up
                </a>
      
      `;
    }

   
  })
  .catch((error) => {
    console.error("Error loading navbar:", error);
  });
  document.addEventListener('DOMContentLoaded', function () {
    
});

// document.addEventListener('DOMContentLoaded', function () {

// });