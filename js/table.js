/** COP 4331-Spr22 Small Project Group 30 */

function setTable(contactList) {

    table = document.getElementById("contactTable");

    table.innerHTML = "";

    var row = table.insertRow(-1);

    var headers = new Array();




    headers.push("Last Name");
    headers.push("First Name");
    headers.push("Phone");
    headers.push("Email");
    headers.push("Street Address");
    headers.push("City");
    headers.push("State");
    headers.push("Zip");
    headers.push("Edit");
    headers.push("Delete");

    var columnCount = headers.length;

    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = headers[i];
        row.appendChild(headerCell);
    }


    return row;
}

function setRow(table, contactList, row, i, contactId) {

    row = table.insertRow(i+1);

    var lastNameCell = row.insertCell(0);
    lastNameCell.innerHTML = contactList[i].lastName;

    var firstNameCell = row.insertCell(1);
    firstNameCell.innerHTML = contactList[i].firstName;

    var phoneCell = row.insertCell(2);
    phoneCell.innerHTML = contactList[i].phoneNumber;

    var emailCell = row.insertCell(3);
    emailCell.innerHTML = contactList[i].emailAddress;

    var streetAddressCell = row.insertCell(4);
    streetAddressCell.innerHTML = contactList[i].streetAddress;

    var cityCell = row.insertCell(5);
    cityCell.innerHTML = contactList[i].city;

    var stateCell = row.insertCell(6);
    stateCell.innerHTML = contactList[i].state;

    var zipCell = row.insertCell(7);
    zipCell.innerHTML = contactList[i].zip;

    var editCell = row.insertCell(8)
    let eButton = document.createElement("button");
    eButton.name = "editButton";
    eButton.style.border = "none";
    eButton.style.background = "transparent";
    eButton.value = contactId;
    eButton.className = "iconButton";
    eButton.onclick = function () { editWindow(table, contactList, i) };
    eButton.innerHTML = '<span style="font-size: 1rem;"><span style="color: #5BC0BE ;" ><i class="fas fa-edit"></i></span ></span >';
    editCell.appendChild(eButton);

    var deleteCell = row.insertCell(9);
    let dButton = document.createElement("button");
    dButton.name = "deleteButton";
    dButton.style.border = "none";
    dButton.style.background = "transparent";
    dButton.value = contactId;
    dButton.className = "iconButton";
    dButton.onclick = function () { deleteCheck(contactList[i].contactId) };
    dButton.innerHTML = '<span style="font-size: 1rem;"><span style="color: #5BC0BE; border: none" ><i class="fas fa-trash-alt"></i></span ></span >';
    deleteCell.appendChild(dButton);
}