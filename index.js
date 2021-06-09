console.log(API_URL);

var list = []; //leads list
var rowToDelete; 
var rowToMark;


function getAllLeads(){ //GET THE LIST OF ALL LEADS AND ADD IT TO THE LIST ARRAY AND TABLE
    fetch('http://localhost:8080/api/leads')
    .then(response => response.json())
    .then(json => {
        json.forEach(lead =>{
            list.push(lead);
            addNew(lead);            
        })
        console.log(list);
    })
    .catch((e) =>{
        console.log(e);
        alert(e);
    })
}//-------------------------------------------------------
function reloadTheList(){//GET THE LIST OF ALL LEADS AND ADD IT TO THE LIST ARRAY
    list = [];
    fetch('http://localhost:8080/api/leads')
    .then(response => response.json())
    .then(json => {
        json.forEach(lead =>{
            list.push(lead);           
        })
        console.log(list);
    })
    .catch((e) => {
        console.log(e);
        alert(e);
    })
}//--------------------------------------------------------------

function openForm(){ //OPEN ADD FORM
    resetFormEntries();
    document.getElementById("myForm").style.display="block";
}//------------
function closeForm(){ // CLOSE ADD FORM
    document.getElementById("myForm").style.display="none";
}//-----------------------------------------------------

function resetFormEntries(){ //RESETS FORM TEXT FIELDS
    document.getElementById('first_name').value = "";
    document.getElementById('last_name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('mobile').value = "";
    document.getElementById('location_type').value = "";
    document.getElementById('location_string').value = "";
}//--------------------------------------

function formSubmit(){// POSTS FORM DATA TO THE API, RECEIVES CODE AND CALLS THE RELOADTHELIST() FUNCTION
    var entry = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        location_type: document.getElementById('location_type').value,
        location_string: document.getElementById('location_string').value,
        status: 1
    }; 
    fetch('http://localhost:8080/api/leads',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    })
    .then(response => {
        console.log(response.status);
        if(response.status == 201){
            return response.json();
        }       
    })
    .then(json =>{
        addNew(json);
        console.log('Succes: ', json);
        reloadTheList();
        closeForm();    
    })
    .catch((e) =>{
        alert("ERROR!")
        console.error(e);
    })

}//------------------------------------------------------------------------------------------------------------


function deleteEntry(){//SENDS DELETE WITH ID FROM THE LIST ARRAY AND CALLS THE RELOADTHELIST() FUNCTION
    var table = document.getElementById('main_table');
    var entryID = rowToDelete-1;
    var entry = list[entryID];

fetch('http://localhost:8080/api/leads/' + entry.id, {
    method: 'DELETE',
})
.then(response =>{   
    console.log(response.status); 
    if(response.status == 200){
        table.deleteRow(rowToDelete);
        reloadTheList();
        console.log("Success!"); 
        closeDelete();  
    }
})
.catch((e) =>{
    alert(e);
    console.error(e);
    closeDelete();
})    
}//------------------------------------------------------------------------------------------------------

function markUpdate(){// SENDS PUT TO THE ID FROM LIST ARRAY AND COMMUNICATION STRING FROM COMMUNICATION FIELD AND CALLS THE RELOADTHELIST() FUNCTION
    var text = document.getElementById('communication').value;
    var out = {
        communication: text
    }
    var entryID = rowToMark-1;
    var entry = list[entryID];
    fetch('http://localhost:8080/api/mark_lead/' + entry.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(out),
    })
    .then(response => {
        if(response.status == 202){
            console.log("Success!"); 
            reloadTheList();
            closeUpdate(); 
        }
    })
    .catch((e) => {
        console.log(e);
        closeUpdate();
        alert(e);
    })
}//-------------------------------------------------------------------------------------------------------------

function markUpdate_open_window(btn){//OPENS THE COMMUNICATION WINDOW
    rowToMark = btn.closest("tr").rowIndex;
    console.log(rowToMark);
    document.getElementById('communication').value = list[rowToMark-1].communication;
    document.getElementById("commForm").style.display="block";
}//-------------------------
function closeUpdate(){  // CLOSES THE COMMUNICATION WINDOW
    rowToMark = null;  
    document.getElementById("commForm").style.display="none";
}//-----------------------------------------------------------------



function deleteLead_open_window(btn){//OPENS THE DELETE WINDOW
    rowToDelete = btn.closest("tr").rowIndex;
    console.log(rowToDelete);
    document.getElementById("deleteForm").style.display="block";
}//-------------------------------
function closeDelete(){// CLOSES THE DELETE WINDOW
    rowToDelete=null;
    document.getElementById("deleteForm").style.display="none";    
}//-----------------------------------------------------------------


function addNew(entry){//ADDS DATA TO THE TABLE
    var tableBody = document.querySelector('tbody');
    tableBody.innerHTML += `
    <tr>
        <td>${entry.first_name} ${entry.last_name}</td>
        <td name="table_email_entry">${entry.email}</td>
        <td>${entry.mobile}</td>
        <td>${entry.location_type}</td>
        <td>${entry.location_string}</td>
        <td>     
            <button type="button" class="update_lead_modal_btn" onclick="markUpdate_open_window(this)">Mark Update</button> <button type="button" onclick="deleteLead_open_window(this)" id="del_btn" class="delete_lead_modal_btn">Delete</button>
        </td>
    </tr>
    `;  
}//------------------------------------------------------------------------------------------------------



