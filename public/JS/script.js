// Navbar Menu
let menu = document.querySelector(".menu");
let cross = document.querySelector(".cross");
let nav2 = document.querySelector(".nav2");
menu.addEventListener("click",()=>{
    console.log("Clicked");
    nav2.style.left = "0";
});

cross.addEventListener("click",()=>{
    console.log("Clicked");
    nav2.style.left = "-100%";
});

// Form Validation Bootstrap
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// for nav click effect

// Get all the nav links
let links = document.querySelectorAll(".nav-a");

// Retrieve the active link from localStorage (if any)
const activeLink = localStorage.getItem("activeLink");

// If there's an active link stored, find it and add the 'active' class
if (activeLink) {
  links.forEach(link => {
    if (link.href === activeLink) {
      link.classList.add("active");
    }
  });
}

// Add click event listeners to the links
links.forEach(link => {
  link.addEventListener("click", () => {
    // Remove the 'active' class from all links
    links.forEach(link => {
      link.classList.remove("active");
    });

    // Add the 'active' class to the clicked link
    link.classList.add("active");

    // Store the href of the clicked link in localStorage
    localStorage.setItem("activeLink", link.href);
  });
});
