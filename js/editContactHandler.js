function updateContact(newInfo, callback) {
    console.log('in update contact');
    event.preventDefault();

    console.log('newInfo: ', newInfo);

    let url = '/api/editContact.php';

    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('response text: ', JSON.stringify(xhr.responseText));
                var data = JSON.parse(xhr.responseText);
                if (data.success) {
                    console.log('successfully updated contact');
                    callback(4); // Call the callback with a success code
                } else {
                    alert('update error');
                }
            } else {
                // Handle different error codes here
                if (xhr.status === 409) {
                    // 409 indicates a conflict (duplicate)
                    var errorData = JSON.parse(xhr.responseText);
                    if (errorData.error === 'Contact exist with same phone number and email.') {
                        console.log('Phone and email duplicate');
                        callback(3); // Call the callback with a conflict code
                    } else if (errorData.error === 'Contact exist with same phone number.') {
                        console.log('Phone duplicate');
                        callback(1); // Call the callback with a phone duplicate code
                    } else if (errorData.error === 'Contact exist with same email.') {
                        console.log('Email duplicate');
                        callback(2); // Call the callback with an email duplicate code
                    }
                } else {
                    // Handle other HTTP status codes as needed
                    console.log('HTTP Error:', xhr.status);
                }
            }
        }
    }

    xhr.send(JSON.stringify(newInfo));
}
