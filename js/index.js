const login = document.getElementById('login');
const overlayL = document.querySelector('.loginOverlay');
const signup = document.getElementById('signup');
const overlayS = document.querySelector('.signupOverlay');

// -------------login/signup buttons on welcome----------
login.addEventListener('click', () => {
    document.getElementById('email_inp').value = '';
    document.getElementById('passwrd_inp').value = '';
    document.getElementById('invalidLogin').style.display = 'none';
    showOverlay(overlayL);
    hideOverlay(overlayS);
});

const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email_inp').value;
    const passwrdInput = document.getElementById('passwrd_inp').value;

    // check if all fields filled and if any invalid inputs
    let valid = isValidEmail_P(emailInput, passwrdInput, 'invalidLogin');
    if (valid) {
        const loginData = {
            email: emailInput,
            password: passwrdInput,
        };

        if (!loginUser(loginData))
        {
            document.getElementById('invalidLogin').textContent = 'Invalid login credentials. Please try again.';
        }
    }
    else {
        document.getElementById('invalidLogin').style.display = 'block';
    }
}); 

signup.addEventListener('click', () => {
    document.getElementById('email_inpS').value = '';
    document.getElementById('passwrd_inpS').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';

    showOverlay(overlayS);
    hideOverlay(overlayL);

});

const signupBtn = document.getElementById('signupBtn');
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const phoneN = document.getElementById('phone_inp').value;
    const emailInput = document.getElementById('email_inpS').value;
    const passwrdInput = document.getElementById('passwrd_inpS').value;
    
    document.getElementById('invalidSignup').style.display = 'none';
    // check if valid inputs
    let valid = isValid(firstName, lastName, phoneN, emailInput, passwrdInput);
    if (valid) {
        const login = {
            first_name: firstName,
            last_name: lastName,
            phone: deFormatPhone(phoneN),
            email: emailInput,
            password: passwrdInput
        };

        if (!registerUser(login)) {
            document.getElementById('invalidLogin').textContent = 'Email is already registered. Please use a different email.';
        }
    }
    else {
        document.getElementById('invalidSignup').style.display = 'block';
    }
}); 
// --------------------------------------------------

// ----------------login/signup as mode change----------
const login_small = document.getElementById('login_small');
login_small.addEventListener('click', () => {
    document.getElementById('email_inp').value = '';
    document.getElementById('passwrd_inpS').value = '';
    document.getElementById('invalidLogin').style.display = 'none';

    showOverlay(overlayL);
    hideOverlay(overlayS);
});

const signup_small = document.getElementById('signup_small');
signup_small.addEventListener('click', () => {
    document.getElementById('email_inpS').value = '';
    document.getElementById('passwrd_inpS').value = '';
    document.getElementById('email_inp').value = '';
    document.getElementById('passwrd_inp').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('invalidSignup').style.display = 'none';

    showOverlay(overlayS);
    hideOverlay(overlayL);
});

function showOverlay(overlay) {
    overlay.style.display = "flex"; // Show the overlay
    setTimeout(function() {
        overlay.style.opacity = "1"; // Fade it in
    }, 10);
}

function hideOverlay(overlay) {
    overlay.style.opacity = "0"; // Fade it out
    setTimeout(function() {
        overlay.style.display = "none"; // Hide the overlay
    }, 300);
}
// ----------------------------------------------------

// ------------close/back button -------------
const closeL = document.getElementById('closeL');
closeL.addEventListener('click', function() {
    hideOverlay(overlayS);
    hideOverlay(overlayL);
});

const closeS = document.getElementById('closeS');
closeS.addEventListener('click', function() {
    hideOverlay(overlayS);
    hideOverlay(overlayL);
});
// --------------------------------------------

// -------------isValid functions----------------
function isValidEmail_P(email, password, id) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPasswordValid = password.length >= 3;
    const isEmailValid = emailRegex.test(email);
    if (email === '' || password === '') {
        document.getElementById(id).textContent = 'Please enter your email and password.';
        return false;
    }
    else if (!isEmailValid) {
        document.getElementById(id).textContent = 'Invalid email address. Please enter a valid email.';        
        return false;
    }
    else if (!isPasswordValid) {
        document.getElementById(id).textContent = 'Invalid password. Must be at least 6 characters long.';
        return false;
    }
    return true;
}

// convert numbers to readeable phone number
function deFormatPhone(number) {
    const numericPhone = number.replace(/\D/g, '');
    return numericPhone;
}

function isValid(first, last, phone, email, passwrd) {
    const isPhoneValidd = isPhoneValid(phone);
    if (first === '' || last ==='' || email === '' || passwrd === '' || phone === '') {
        document.getElementById('invalidSignup').textContent = 'Please fill out all fields.';
        return false;
    }
    else {
        return isValidEmail_P(email, passwrd, 'invalidSignup') && isPhoneValidd;
    }
}

function isPhoneValid(phone) {
    const numericPhone = deFormatPhone(phone);
    const phoneRegex = /^\d{10}$/;
    const isPhoneValid = phoneRegex.test(numericPhone);
    if (isPhoneValid) {
        return true;
    } else {
        document.getElementById('invalidSignup').textContent = 'Invalid phone. Please enter a valid phone number.';        
        return false;
    }
}
// ----------------------------------------------
