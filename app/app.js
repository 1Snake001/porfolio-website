"use strict";

import services from "../services/services.js";


const header = document.querySelector("header");
const nav = document.querySelector("nav");
const toggleButton = document.querySelector(".toggle-button");
const navLinks = document.querySelectorAll(".item");
const errorsElements = document.querySelectorAll(".error");
const successAlert = document.querySelector(".alert-succes");

const inputs = document.querySelectorAll(".formInput");


const form = document.querySelector("form");


function activeClassListSwitch() {
  toggleButton.classList.toggle("active");
  nav.classList.toggle("active");
}

function activeClassListRemover() {
  toggleButton.classList.remove("active");
  nav.classList.remove("active");
}

function removeSubmitted() {
  for (let i of inputs) {
    i.classList.remove("submitted");
  }
  successAlert.classList.remove("submitted");
}

toggleButton.addEventListener("click", activeClassListSwitch);

window.addEventListener("scroll", function () {
  activeClassListRemover();
  let windowScrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const contactSection = document.querySelector(".contact-container");

  if (windowScrollY > 20) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }

  if (
    documentHeight - (windowScrollY + windowHeight) >=
    contactSection.scrollHeight
  ) {
    removeSubmitted();
    errorsElements.forEach((error) => {
      error.classList.remove("active");
      error.innerHTML = "";
    });
    inputs.forEach((input) => {
      input.classList.remove("active");
      input.value = "";
    });
  }
});

window.addEventListener("resize", function () {
  const windowWidth = window.innerWidth;
  if (windowWidth > 700) {
    activeClassListRemover();
  }
});


navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    activeClassListRemover();
  });
});


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


  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};


const isRealName = (name) => {
  const nameRegex =
    /^[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű\s]*[A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű][A-Za-zÁáÉéÍíÓóÖöŐőÚúÜüŰű\s]*$/;
  return nameRegex.test(name);
};

const isGreaterThanThree = (name) => {
  return name.length > 3;
};

const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const accentedLetterRegex = /[^\u0000-\u007F]/; 
  return !accentedLetterRegex.test(email) && emailRegex.test(email);
};

const isNotEmpty = (value) => {
  return value !== "";
};

const textForErrorMessages = {
  requiredName: "Please enter real name!",
  moreThan3: "Please enter real name!",
  requiredEmail: "Please enter a valid email address!",
  requiredTextArea: "Please enter a message!",
};

let validators = {
  nameInput: {
    requiredName: isRealName,
    moreThan3: isGreaterThanThree,
  },
  emailInput: {
    requiredEmail: isEmail,
  },
  textArea: {
    requiredTextArea: isNotEmpty,
  },
};

const validator = (name, value) => {
  let validator = validators[name];

  for (let validFn in validator) {
    let error = document.getElementsByClassName(name)[0];
    let input = document.getElementsByName(name)[0];

    if (!validator[validFn](value)) {
      error.innerHTML = textForErrorMessages[validFn];
      error.classList.add("active");
      input.classList.add("active");
      removeSubmitted();
    } else {
      error.innerHTML = "";
      error.classList.remove("active");
      input.classList.remove("active");
    }
  }
};

let isFormValid = false;
const validateForm = () => {
  let inputErrors = [];

  inputs.forEach((input) => {
    validator(input.name, input.value);
    if (document.getElementsByClassName(input.name)[0].innerHTML === "") {
      inputErrors.push(true);
    } else {
      inputErrors.push(false);
    }
  });
  isFormValid = !inputErrors.includes(false);
};

const onblurHandler = (event) => {
  validator(event.target.name, event.target.value);
};

function onblurEventHelper() {
  for (let input of inputs) {
    input.addEventListener("blur", onblurHandler);
  }
}
onblurEventHelper();

// Post message with firestore
const submitHandler = (event) => {
  event.preventDefault();
  validateForm();

  const inputValues = {};

  if (isFormValid) {
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
      input.value = "";
    });
    services.addMessage(inputValues);
    successAlert.classList.add("submitted");
    for (let input of inputs) {
      input.classList.add("submitted");
    }
  } else {
    removeSubmitted();
  }
};

form.addEventListener("submit", submitHandler);
