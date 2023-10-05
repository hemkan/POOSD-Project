function loginUser(username, password) {
    console.log('made it to loginHandler');
    console.log('data being sent: ' + username + ' ' + password);

    // Retrieve the username and password values from the form
    event.preventDefault(); // Prevent the default form submission

    let loginData = {
        username: username,
        password: password
    };

    console.log('before setting url');
    let url = 'api/LoginController.php';

    console.log('after setting url');

    console.log(JSON.stringify(loginData));

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Define a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    console.log('successful login attempt redirect to user page.');
                    alert(data.success);
                    window.location.href = 'pages/userPage.php';
                } else if (data.error) {
                    alert(data.error);
                }
            } else if (xhr.status === 401) {
                // Handle 401 Unauthorized error
                alert('Invalid Username or Password');
            } else if (xhr.status === 404) {
                // Handle 404 Not Found error
                alert('Username not recognized.');
            } else {
                // Handle other HTTP response errors
                alert('An error occurred during login. Please try again later.');
            }
        }
    };

    // Send the request with the JSON data
    xhr.send(JSON.stringify(loginData));
}
