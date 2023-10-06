const searchBarInput = document.getElementById('search-bar');

searchBarInput.addEventListener('input', () =>
{
    updateSearchResults(searchBarInput.value);
});

async function  updateSearchResults(input)
{


    let url = `/api/RetrieveContacts.php?input=${input}`

    return fetch (url, 
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json'
            },
    })
    .then(respone => 
        {
            if (respone.ok)
            {
                console.log('response ok');
                return respone.json();
            }else 
            {
                throw new Error('Network respponse was not ok.');
            }
    })
    .then(data=>
        {
            console.log('data:' + data);
            loadContacts(data, 'search-result-list-body');
        })
    .catch(error =>
    {
        console.error('An error occured retrieveing data: ' + error);
        return null;
    });

}   