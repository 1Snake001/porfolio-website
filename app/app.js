"use strict";

// DOM Elements
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const toggleButton = document.querySelector(".toggle-button");

// The navbar and the toggle button switch
function activeClassListSwitch() {
  toggleButton.classList.toggle("active");
  nav.classList.toggle("active");
};

function activeClassListRemover(){
    toggleButton.classList.remove("active");
    nav.classList.remove("active");
  };

toggleButton.addEventListener("click", activeClassListSwitch);

window.addEventListener("scroll", function () {
  let windowScrollY = window.scrollY;
  if (windowScrollY > 20) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

window.addEventListener('resize', function(){
    const windowWidth = window.innerWidth;
    if(windowWidth > 700){
        activeClassListRemover();
    }
  }); 