
const createButton = document.getElementById('create_button');

createButton.addEventListener('click', () => {
    
    const first_name_value = document.getElementById('first_name').value;
    const last_name_value = document.getElementById('last_name').value;
    const email_value = document.getElementById('email').value;
    const phone_value = document.getElementById('phone').value;

    console.log('First Name Value:', first_name_value);
    console.log('Last Name Value:', last_name_value);

    createContact(user_ID, first_name_value, last_name_value, email_value, phone_value);
})

function createContact(access_id, first_name, last_name, email, phone){
    let contact_data = {
        access_id: access_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone
        
    }

    let url = '/api/CreateContactController.php';
    console.log(JSON.stringify(contact_data));

    fetch(url, 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(contact_data)
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

                set_contacts(); // update contact list with new contact

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