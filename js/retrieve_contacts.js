function retrieve_contacts(user_ID) {
    let url = `/api/RetrieveContacts.php?user_ID=${user_ID}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('An error occurred retrieving your contacts: ' + error);
        return null; // Return null in case of an error
    });
}