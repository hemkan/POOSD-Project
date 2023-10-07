import { populateTable } from './display.js';
// import { populateTable } from './display.js';

// delete this function
function loadTable(result_obj)
{
    let data = JSON.parse(result_obj);
    document.getElementById("table_body").innerHTML = "";
    let new_table = "";

    for (let i = 0; i < data.length; i++)
    {
        const name = data[i].first_name + ' ' + data[i].last_name;
        new_table += "<tr>";
        new_table += "<td>" + name + "</td>";
        new_table += "<td>" + data[i].phone + "</td>";
        new_table += "<td>" + data[i].email + "</td>";
        new_table += "<button id=" + data[i].contact_id + " onclick=deleteContact(this.id)>delete</button>";
        new_table += "</tr>";
    }
    document.getElementById("table_body").innerHTML = new_table;
}

function loadAllContact()
{
    // let new_string = {id:user_id};
    // let send_json = JSON.stringify(new_string);
    let process = new XMLHttpRequest();
    process.open("POST", "/small_project/POOSD-Project/api/a_read.php", true);
    process.setRequestHeader("Content-type", "application/json");

    process.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {

            let obj = (process.responseText);
            let data = JSON.parse(obj);
            populateTable(data);
        }
    };
    process.send();
}

function searchInput()
{
    // modify this to store the current user id
    // let user_id = 1;
    let text = new String(document.getElementById("search-bar-input").value);

    // alert(text);
    if (text.length > 0)
    {
        // let new_string = {id:user_id, search_string:text};
        let new_string = {search_string:text};
        let send_json = JSON.stringify(new_string);
        let process = new XMLHttpRequest();
        process.open("POST", "/small_project/POOSD-Project/api/a_search.php", true);
        process.setRequestHeader("Content-type", "application/json");
        
        process.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200)
            {
                
                let obj = (process.responseText);
                let data = JSON.parse(obj);
                populateTable(data);
            }
        };
        process.send(send_json);
    }
    else
    {
        // loadAllContact(user_id);
        loadAllContact();
        
    }
}

function deleteContact(contact_id)
{
    // change this to the current user
    // let user_id = 1; 
    let new_string = {id:contact_id};
    let send_json = JSON.stringify(new_string);
    let process = new XMLHttpRequest();
    process.open("POST", "/small_project/POOSD-Project/api/delete.php", true);
    process.setRequestHeader("Content-type", "application/json");

    process.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let obj = (process.responseText);
            // loadAllContact(user_id);
            loadAllContact();
        }
    };
    process.send(send_json);
}

function main()
{
    // modify this to use the current user_id
    // let user_id = 1;
    document.querySelector(".table").onload = loadAllContact();
}

main();

export { searchInput, deleteContact };