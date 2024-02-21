const errorMessage = document.querySelector("#error-message");
const emailInput = document.querySelector("#email");
const firstNameInput = document.querySelector("#firstname");
const lastNameInput = document.querySelector("#lastname");
const zipCodeInput = document.querySelector("#zipcode");
const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector(
  "#password-confirmation"
);

function validateInput(input, isValid, errorMessageText) {
  if (!isValid) {
    errorMessage.textContent = errorMessageText;
  } else {
    errorMessage.textContent = "";
  }
}
firstNameInput.addEventListener("input", () => {
  const isValid =
    firstNameInput.value.length > 3 && firstNameInput.value.length < 20;
  validateInput(
    firstNameInput,
    isValid,
    "First Name must be between 4 and 19 characters long"
  );
});

lastNameInput.addEventListener("input", () => {
  const isValid =
    lastNameInput.value.length > 3 && lastNameInput.value.length < 20;
  validateInput(
    lastNameInput,
    isValid,
    "Last Name must be between 4 and 19 characters long"
  );
});

emailInput.addEventListener("input", () => {
  const isValid = emailInput.validity.valid;
  validateInput(emailInput, isValid, "Email is not correctly formatted");
});

zipCodeInput.addEventListener("input", () => {
  const isValid =
    zipCodeInput.value.length > 4 && zipCodeInput.value.length < 10;
  validateInput(
    zipCodeInput,
    isValid,
    "Zipcode must be between 5 and 9 characters long"
  );
});

passwordInput.addEventListener("input", () => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
  const isValid = passwordRegExp.test(passwordInput.value);
  validateInput(
    passwordInput,
    isValid,
    "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
  );
});

passwordConfirmationInput.addEventListener("input", () => {
  const isValid = passwordConfirmationInput.value === passwordInput.value;
  validateInput(passwordConfirmationInput, isValid, "Passwords do not match");
});
