function setTable(table) {

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

function setRow(table, jsonObject, row, i, contactId) {

    row = table.insertRow(1);

    var lastNameCell = row.insertCell(0);
    lastNameCell.innerHTML = jsonObject.results[i].lastName;

    var firstNameCell = row.insertCell(1);
    firstNameCell.innerHTML = jsonObject.results[i].firstName;

    var phoneCell = row.insertCell(2);
    phoneCell.innerHTML = jsonObject.results[i].phoneNumber;

    var emailCell = row.insertCell(3);
    emailCell.innerHTML = jsonObject.results[i].emailAddress;

    var streetAddressCell = row.insertCell(4);
    streetAddressCell.innerHTML = jsonObject.results[i].streetAddress;

    var cityCell = row.insertCell(5);
    cityCell.innerHTML = jsonObject.results[i].city;

    var stateCell = row.insertCell(6);
    stateCell.innerHTML = jsonObject.results[i].state;

    var zipCell = row.insertCell(7);
    zipCell.innerHTML = jsonObject.results[i].zip;

    var editCell = row.insertCell(8)
    let eButton = document.createElement("button");
    eButton.name = "editButton";
    eButton.style.border = "none";
    eButton.style.background = "transparent";
    eButton.value = contactId;
    eButton.className = "iconButton";
    eButton.onclick = function () { editWindow(table, jsonObject, i) };
    eButton.innerHTML = '<span style="font-size: 1rem;"><span style="color: mediumseagreen;" ><i class="fas fa-edit"></i></span ></span >';
    editCell.appendChild(eButton);



    var deleteCell = row.insertCell(9);
    let dButton = document.createElement("button");
    dButton.name = "deleteButton";
    dButton.style.border = "none";
    dButton.style.background = "transparent";
    dButton.value = contactId;
    dButton.className = "iconButton";
    dButton.onclick = function () { deleteCheck(jsonObject.results[i].contactId) };
    dButton.innerHTML = '<span style="font-size: 1rem;"><span style="color: mediumseagreen; border: none" ><i class="fas fa-trash-alt"></i></span ></span >';
    deleteCell.appendChild(dButton);
}