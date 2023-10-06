// createContactHandler_slp7.js

function createContact(newContactData){

    let url = '/api/CreateContactController_slp7.php';
    console.log(JSON.stringify(newContactData));

    fetch(url, 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(newContactData)
        })
        .then(respose =>
        {
            if (respose.ok)
            {
                console.log('response ok');
                return respose.json();
            }else
            {
                throw new Error('Network response was not ok');
            }
        })
        .then(data =>
        {
            if(data.success) 
            {
                console.log('data success');

                alert(data.success);

                //updateSearchResults('/0'); // update contact list with new contact

            }
            else if (data.error)
            {
                console.log('data error');
                alert(data.error);
            }
        })
        .catch(error =>
        {
            console.error('An error has occurred while adding the contact.');
        })
}