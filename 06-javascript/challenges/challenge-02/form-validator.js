const form = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const validators = {
  username: false,
  email: false,
  password: false,
  confirmPassword: false
};

// Helper functions
function setValid(input, errorEl) {
  input.classList.add("valid");
  input.classList.remove("invalid");
  input.nextElementSibling.style.display = "inline";
  errorEl.textContent = "";
}

function setInvalid(input, errorEl, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  input.nextElementSibling.style.display = "none";
  errorEl.textContent = message;
}

function checkFormValidity() {
  submitBtn.disabled = !Object.values(validators).every(v => v === true);
}

// Username validation
username.addEventListener("blur", () => {
  const value = username.value.trim();
  const regex = /^[a-zA-Z0-9]{3,15}$/;

  if (!regex.test(value)) {
    setInvalid(username, usernameError, "3-15 chars, alphanumeric only");
    validators.username = false;
  } else {
    setValid(username, usernameError);
    validators.username = true;
  }
  checkFormValidity();
});

// Email validation
email.addEventListener("blur", () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email.value.trim())) {
    setInvalid(email, emailError, "Enter a valid email");
    validators.email = false;
  } else {
    setValid(email, emailError);
    validators.email = true;
  }
  checkFormValidity();
});

// Password validation
password.addEventListener("blur", () => {
  const value = password.value;
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!regex.test(value)) {
    setInvalid(
      password,
      passwordError,
      "8+ chars, 1 uppercase, 1 number, 1 special char"
    );
    validators.password = false;
  } else {
    setValid(password, passwordError);
    validators.password = true;
  }
  checkFormValidity();
});

// Confirm password validation
confirmPassword.addEventListener("blur", () => {
  if (confirmPassword.value !== password.value || confirmPassword.value === "") {
    setInvalid(confirmPassword, confirmPasswordError, "Passwords do not match");
    validators.confirmPassword = false;
  } else {
    setValid(confirmPassword, confirmPasswordError);
    validators.confirmPassword = true;
  }
  checkFormValidity();
});

// Prevent submit if invalid
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted successfully!");
});