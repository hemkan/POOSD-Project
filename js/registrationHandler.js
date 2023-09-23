function registerUser(username, password) {
    console.log('made it to registrationHandler');
    // Retrieve the username and password values from the form
    let usernameValue = document.getElementById('username').value;
    let passwordValue = document.getElementById('password').value;

    let registrationData = {
        username: username,
        password: password
    };
    //some test
    // Debugging: Log the registrationData object to the console
    console.log('Registration Data:', registrationData);

    // Define the URL for your PHP script
    let url = '/pages/RegistrationController.php';

    // Create a fetch request
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse JSON response
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        // Handle the JSON response data
        if (data.success) {
            alert(data.success);
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('An error occurred during registration:', error);
    });
}
