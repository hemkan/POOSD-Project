function registerUser(username, password, first_name, last_name) {
    // Retrieve the username and password values from the form
   

    let registrationData = {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name
    };
    //some test
    // Debugging: Log the registrationData object to the console
    console.log('Registration Data:', registrationData);

    // Define the URL for your PHP script
    let url = 'api/RegistrationController.php';

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
            window.location.href = '/';
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('An error occurred during registration:', error);
    });
}
