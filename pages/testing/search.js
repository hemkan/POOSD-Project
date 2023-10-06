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

function loadAllContact(user_id)
{
    // let user_id = 1;
    // document.getElementById("search").style.display = "none";
    // document.getElementById("not_search").style.display = "block";
        
    let new_string = {id:user_id};
    let send_json = JSON.stringify(new_string);
    let process = new XMLHttpRequest();
    process.open("POST", "a_read.php", true);
    process.setRequestHeader("Content-type", "application/json");

    process.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {

            let obj = (process.responseText);
            loadTable(obj);
            // let json_result = JSON.parse(obj);
            // let name = json_result[0].last_name + ' ' + json_result[0].first_name;
            // let result = (json_result[0].last_name).concat(" ", json_result[0].first_name);
            // document.getElementById("not_search").innerHTML = name; // + " " + json_result[0].first_name);
            // alert(json_result.length);
            // alert(json_result[0].last_name);
            // document.getElementById("not_search").innerHTML = obj;
            // document.getElementById("temp").innerHTML = (JSON.parse(json_result[0])).first_name;
        }
    };
    process.send(send_json);
}

function searchInput()
{
    // modify this to store the current user id
    let user_id = 1;
    let text = new String(document.getElementById("comment").value);

    if (text.length > 0)
    {
        // alert(text);
        // document.getElementById("search").style.display = "block";
        // document.getElementById("not_search").style.display = "none";
        
        let new_string = {id:user_id, search_string:text};
        let send_json = JSON.stringify(new_string);
        let process = new XMLHttpRequest();
        process.open("POST", "a_search.php", true);
        process.setRequestHeader("Content-type", "application/json");
        
        process.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200)
            {
                
                let obj = (process.responseText);
                // alert(obj);
                loadTable(obj);
                // alert(obj);s
                // let json_result = JSON.parse(obj);
                // alert("here...1");
                // document.getElementById("search").innerHTML = json_result[0].last_name;
            }
        };
        process.send(send_json);
    }
    else
    {
        // alert(user_id);
        loadAllContact(user_id);
        // document.getElementById("search").style.display = "none";
        // document.getElementById("not_search").style.display = "block";
        
        // let new_string = {id:user_id};
        // let send_json = JSON.stringify(new_string);
        // let process = new XMLHttpRequest();
        // process.open("POST", "a_read.php", true);
        // process.setRequestHeader("Content-type", "application/json");

        // process.onreadystatechange = function() 
        // {
        //     if (this.readyState == 4 && this.status == 200)
        //     {

        //         let obj = (process.responseText);
        //         let json_result = JSON.parse(obj);
        //         document.getElementById("not_search").innerHTML = json_result[0].last_name;
        //         // document.getElementById("not_search").innerHTML = obj;
        //         // document.getElementById("temp").innerHTML = (JSON.parse(json_result[0])).first_name;
        //     }
        // };
        // process.send(send_json);
        
    }
}

function deleteContact(contact_id)
{
    // change this to the current user
    let user_id = 1; 
    let new_string = {id:contact_id};
    let send_json = JSON.stringify(new_string);
    let process = new XMLHttpRequest();
    process.open("POST", "../delete.php", true);
    process.setRequestHeader("Content-type", "application/json");

    process.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let obj = (process.responseText);
            loadAllContact(user_id);
        }
    };
    process.send(send_json);
}

function main()
{
    document.getElementById("table_body").onload = loadAllContact(1);
}

main();