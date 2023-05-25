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
  
  // Typeing handler
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

window.onload = function () {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // INJECT CSS
  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};