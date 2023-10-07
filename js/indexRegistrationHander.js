function registerUser(registrationData) {
    // Retrieve the username and password values from the form
    // /js/indexRegistrationHander.js
   

    //some test
    // Debugging: Log the registrationData object to the console
    console.log('Registration Data:', registrationData);

    // Define the URL for your PHP script 
    event.preventDefault();

    let url = 'api/RegistrationController_slp7.php';


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
            console.log('response not ok')
            alert('response not ok');
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        // Handle the JSON response data
        if (data.success) {
            alert(data.success);

            window.location.href = '/index.html';
        } else if (data.error) {
            console.log('issues later')
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('An error occurred during registration:', error);
    });
}
