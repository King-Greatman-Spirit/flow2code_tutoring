// Get form and input elements by their IDs
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Function to show an error message
function showError(input, message) {
  // Get the parent element of the input (form-control)
  const formControl = input.parentElement;
  // Change the class name to 'form-control error'
  formControl.className = 'form-control error';
  // Get the small element for error message display
  const small = formControl.querySelector('small');
  // Set the error message
  small.innerText = message;
}

// Function to show a success outline
function showSuccess(input) {
  // Get the parent element of the input (form-control)
  const formControl = input.parentElement;
  // Change the class name to 'form-control success'
  formControl.className = 'form-control success';
}

// Function to check if an email is valid using regex
function checkEmail(input) {
  // Define the regular expression for a valid email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Test the input value against the regex
  if (re.test(input.value.trim())) {
    // Show success if the email is valid
    showSuccess(input);
  } else {
    // Show error if the email is not valid
    showError(input, 'Email is not valid');
  }
}

// Function to check if required fields are filled
function checkRequired(inputArr) {
  // Iterate over each input in the array
  inputArr.forEach(function(input) {
    // Check if the input is empty
    if (input.value.trim() === '') {
      // Show error if the input is empty
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      // Show success if the input is filled
      showSuccess(input);
    }
  });
}

// Function to check the length of the input value
function checkLength(input, min, max) {
  // Check if the input length is less than the minimum length
  if (input.value.length < min) {
    // Show error if the input is too short
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    // Show error if the input is too long
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    // Show success if the input length is valid
    showSuccess(input);
  }
}

// Function to check if passwords match
function checkPasswordsMatch(input1, input2) {
  // Check if the values of the two password inputs are not the same
  if (input1.value !== input2.value) {
    // Show error if the passwords do not match
    showError(input2, 'Passwords do not match');
  }
}

// Function to get the field name with the first letter capitalized
function getFieldName(input) {
  // Capitalize the first letter and concatenate with the rest of the string
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener for the form submit event
form.addEventListener('submit', function(e) {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Check if required fields are filled
  checkRequired([username, email, password, password2]);
  // Check the length of the username
  checkLength(username, 3, 15);
  // Check the length of the password
  checkLength(password, 6, 25);
  // Check if the email is valid
  checkEmail(email);
  // Check if the passwords match
  checkPasswordsMatch(password, password2);
});
