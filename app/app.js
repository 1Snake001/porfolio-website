// DOM Elements
const toggleButton = document.querySelector(".toggle-button");
const nav = document.querySelector("nav");

// The navbar and the toggle button switch
function activeClassListSwitch(){
    toggleButton.classList.toggle("active");
    nav.classList.toggle("active");
  };

toggleButton.addEventListener('click', activeClassListSwitch);