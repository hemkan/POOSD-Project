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
loginBtn.addEventListener('click', () => {
    // TODO: check if all fields filled and if any invalid inputs
    let valid = false;
    if (true) {
        // if (check if valid login credentials)
        const loginData = {
            email: document.getElementById('email_inp').value,
            password: document.getElementById('passwrd_inp').value
        };
        console.log('sending: ', loginData);
        loginUser(loginData);

        window.location.href = '../pages/crud.php';
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
signupBtn.addEventListener('click', () => {
    
    document.getElementById('invalidSignup').style.display = 'none';
    // check if valid inputs
    // authenticate
    let valid = false;
    if (true) {
        const login = {
            // "contact_id" :
            first_name: document.getElementById('first').value,
            last_name: document.getElementById('last').value,
            phone: document.getElementById('phone_inp').value,
            email: document.getElementById('email_inpS').value,
            password: document.getElementById('passwrd_inpS').value
            //"date": new Date(),
        };

        registerUser(login);
        // ready to send to the backedn
        // store email and password 
        window.location.href = 'crud.html';
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