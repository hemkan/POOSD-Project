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
// helps check for basic email addresses
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email_inp').value;
    const passwrdInput = document.getElementById('passwrd_inp').value;
    // check if all fields filled and if any invalid inputs
    let valid = isValidEmail_P(emailInput, passwrdInput);
    if (valid) {
        console.log('valid email and passwrd');
        // if (check if valid login credentials)
        const loginData = {
            email: emailInput,
            password: passwrdInput,
        };
        console.log('sending: ', loginData);
        // loginUser(loginData)
        if (true)
        {
            document.getElementById('invalidLogin').textContent = 'Invalid login credentials. Please try again.';
        }
        else {
            console.log('logged in');
            window.location.href = '../pages/crud.php';
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
    const emailInput = document.getElementById('email_inp').value;
    const passwrdInput = document.getElementById('passwrd_inp').value;
    
    document.getElementById('invalidSignup').style.display = 'none';
    // check if valid inputs
    // authenticate
    // let valid = isValid(firstName, lastName, phoneN, emailInput, passwrdInput);
    if (true) {
        const login = {
            // "contact_id" :
            first_name: firstName,
            last_name: lastName,
            phone: deFormatPhone(phoneN),
            email: emailInput,
            password: passwrdInput
            //"date": new Date(),
        };

        registerUser(login);
        // if (registerUser(login))
        // ready to send to the backedn
        // store email and password 
        window.location.href = '../pages/crud.php';
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
    document.getElementById('phone_inp').value = '';
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('invalidSignup').style.display = 'none';

    showOverlay(overlayS);
    hideOverlay(overlayL);
});

function showOverlay(overlay) {
    overlay.style.display = 'flex';
}
function hideOverlay(overlay) {
    overlay.style.display = 'none';
}
// ----------------------------------------------------


// ------------close---------------------------
// const closeL = document.getElementById('closeL');
// closeL.addEventListener('click', function() {
//     showOverlay(overlayL);
// });
// const closeS = document.getElementById('closeS');
// closeS.addEventListener('click', function() {
//     showOverlay(overlayS);
// });
// --------------------------------------------

// -------------isValid------------------------
function isValidEmail_P(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPasswordValid = password.length >= 6;
    const isEmailValid = emailRegex.test(email);
    console.log(isPasswordValid, isEmailValid);
    if (email === '' || password === '') {
        document.getElementById('invalidLogin').textContent = 'Please enter your email and password.';
        return false;
    }
    else if (!isEmailValid) {
        document.getElementById('invalidLogin').textContent = 'Invalid email address. Please enter a valid email.';        
        return false;
    }
    else if (!isEmailValid) {
        document.getElementById('invalidLogin').textContent = 'Invalid password. Must be at least 6 characters long.';
        return false;
    }
    return true;

}
function isValidInfo(first, last, phone) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPasswordValid = password.length >= 6;
    const isEmailValid = emailRegex.test(email);
    // console.log(isPasswordValid, isEmailValid);

    // check if empty
    const isFirstNameValid = first.trim() !== '';
    const isLastNameValid = last.trim() !== '';

    const isPhoneValid = isPhoneValid(phone);
    if (isFirstNameValid && isLastNameValid && isPhoneValid) {
        return true;
    } else {
        return false;
    }
}


function deFormatPhone(number) {
    const numericPhone = number.replace(/\D/g, '');
    return numericPhone;
}
// function isValid(first, last, email, passwrd, phone) {
//     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     // const isPasswordValid = password.length >= 6;
//     // const isEmailValid = emailRegex.test(email);
//     const isPhoneValidd = isPhoneValid(phone);
//     console.log(isPhoneValidd);
//     if (first === '' && last ==='' && email === '' && passwrd === '' && phone === '') {
//         document.getElementById('invalidLogin').textContent = 'Please fill out all required fields.';
//         return false;
//     }
//     else {
//         return isValidEmail_P(email, passwrd) && true;
//     }
// }

function isPhoneValid(phone) {
    const numericPhone = deFormatPhone(phone);
    const phoneRegex = /^\d{10}$/;
    const isPhoneValid = phoneRegex.test(numericPhone);
    if (isPhoneValid) {
        return true;
    } else {
        return false;
    }
}

function errormsg(email, passwrd) {
}
// ------------------------------------------