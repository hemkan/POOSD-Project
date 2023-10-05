// Login_Register.js

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const signupButton = document.getElementById('signup-button');
const loginForm = document.getElementById('login-form');
const password = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password-input');
const registerAccountText = document.getElementById('register-account-text');
const confirmPassword = document.getElementById('confirm-password');
const passwordMismatch = document.getElementById('password-mismatch');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');


function updateRedSquiggle() {
    
    console.log("updating squiggle");

    if (confirmPasswordMatch()) {
        passwordMismatch.style.display = 'none';
        console.log("they match");
    } else {
        passwordMismatch.style.display = 'block';
        console.log("dont match");
        //confirmPasswordInput.classList.add('red-squiggle');
    }
}

function confirmPasswordMatch(){
    let passwordValue = password.value;
    let confirmPasswordInputValue = confirmPasswordInput.value;

    console.log("paswordValue: "+passwordValue);
    console.log("confirmPaswordValue: "+confirmPasswordInputValue);
    return passwordValue === confirmPasswordInputValue;
}

password.addEventListener('input', updateRedSquiggle);
confirmPassword.addEventListener('input', updateRedSquiggle);

// makes register button disappear, and the confirm password box appear
registerButton.addEventListener('click', () => 
{
    //Login
    registerButton.style.display = 'none';
    loginButton.style.display = 'none';
    registerAccountText.style.display = 'none';
    confirmPassword.style.display = 'block';
});

loginButton.addEventListener('click', () => {
    console.log('loginButton pressed');
    let usernameValue = document.getElementById('username').value;
    let passwordValue = password.value;

    if(usernameValue.length != 0 && password.value != 0)
    {
        try{
            loginUser(usernameValue, passwordValue);
            //alert('User successfully logged in');
        }catch{
            throw new Error('user login unsuccessfull');
        }
    }
})

signupButton.addEventListener('click', () => 
{
    let usernameValue = document.getElementById('username').value;
    let passwordValue = password.value;
    let firstNameValue = firstName.value;
    let lastNameValue = lastName.value;
    // check if passwords match
    if (!confirmPasswordMatch()) {
        alert('Passwords do not match. Please try again');
        return;
    }else if(usernameValue.length === 0 || passwordValue.length === 0 || firstNameValue.length === 0 || lastNameValue.length === 0)
    {
        alert('All fields must be filled out');
        return;
    } else 
    {
        
        registerUser(usernameValue, passwordValue, firstNameValue, lastNameValue);
        // Add code to handle registration here
        alert('User registered successfully.');
        
        // Reset the form and hide the confirmation section
        loginForm.reset();
        confirmPassword.style.display = 'none';
        registerButton.style.display = 'block';
    }
});
