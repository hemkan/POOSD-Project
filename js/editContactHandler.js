function updateContact(newInfo){
    console.log('in update contact');
    event.preventDefault();

    console.log('newInfo: ', newInfo);

    let url = '/api/editContact.php';

    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log('response text: ', xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            if(data.success) {
                console.log('successfully updated contact');
            }else{
                alert('update error')
            }
        }
    }

    xhr.send(JSON.stringify(newInfo));
}