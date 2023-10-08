// createContactHandler_slp7.js

function createContact(newContactData, callback)
{

    event.preventDefault('')
    let url = '/api/CreateContactController_slp7.php';

    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4){
            if(xhr.status === 200)
            {
              //  console.log('response text: ', xhr.responseText);
                var data = JSON.parse(xhr.responseText);
                if(data === 'Contact added successfully') {
                   // console.log('contact successfully added');
                    callback(1);
                }else
                {
                    alert('contact add error');
                }
            }else
            {
                var errorData = JSON.parse(xhr.responseText);
                if (xhr.status === 400) 
                {
                    console.log('400 response text: ', xhr.responseText);
                    callback (JSON.parse(xhr.responseText));
                }else
                {
                    alert('HTTP ERROR: ', xhr.status);
                }
            }
        }
    }

    xhr.send(JSON.stringify(newContactData));
}