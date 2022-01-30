/** COP 4331-Spr22 Small Project Group 30 */

function addContact() {

    // return value from API
    // -1 success, 0 error
    let returnId = -2;

    // control variables
    let fullName = false;
    let invalidPhone = false;
    let partialAddress = false;
    let completeAddress = false;
    let minimumContact = false;
    let validContact = false;

    // error messages
    let nameError = "First and last name required.";
    let phoneError = "Invalid phone number. Correct format: 555-555-5555";
    let addressError = "Partial address not allowed.";
    let contactMethodError = "At least one form of contact is required.";

    // form variables
    let newFirstName = document.getElementById("firstName").value;
    let newLastName = document.getElementById("lastName").value;
    let newPhoneNumber = document.getElementById("phoneNumber").value;
    let newEmail = document.getElementById("emailAddress").value;
    let newStreetAddress = document.getElementById("streetAddress").value;
    let newCity = document.getElementById("city").value;
    let newState = document.getElementById("state").value;
    let newZip = document.getElementById("zip").value;

    document.getElementById("addContactResult").innerHTML = "";

    // Check for full name (required)

    if ((newFirstName != "") && (newLastName != "")) {
        fullName = true;
    }

    // Validate correct format of phone number

    if (newPhoneNumber != "") {

        var reg = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");

        if (!reg.test(newPhoneNumber)) {
            invalidPhone = true;
        }
    }

    // Check if any address fields are populated
    // This could mean a partial or full address. 
    // Partial addresses are not acceptable.

    if ((newStreetAddress != "") || (newCity != "") || (newState != "") || (newZip != "")) {

        if ((newStreetAddress == "") || (newCity == "") || (newState == "") || (newZip == "")) {
            partialAddress = true;
        }
        else {
            completeAddress = true;
        }
    }

    // Check that at least one form of contact is complete
    if ((newPhoneNumber != "") || (newEmail != "") || (completeAddress)) {
        minimumContact = true;
    }

    // Check if form is valid overall
    if ((fullName) && (!invalidPhone)&& (!partialAddress) && (minimumContact)) {
        validContact = true;
    }
    else {

        if (!fullName) {
            document.getElementById("addContactResult").innerHTML += nameError + '<br />';
        }

        if (invalidPhone) {
            document.getElementById("addContactResult").innerHTML += phoneError + '<br />';
        }

        if (partialAddress) {
            document.getElementById("addContactResult").innerHTML += addressError + '<br />';
        }

        if (!minimumContact) {
            document.getElementById("addContactResult").innerHTML += contactMethodError + '<br />';
        }

    }

    // If form is valid, send contact to API
    if (validContact) {

        let tmp = {
            firstName: newFirstName, lastName: newLastName, phoneNumber: newPhoneNumber, emailAddress: newEmail,
            streetAddress: newStreetAddress, city: newCity, state: newState, zip: newZip, userId: userId
        };

        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/AddContact.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try {
            xhr.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    let jsonObject = JSON.parse(xhr.responseText);
                    returnId = jsonObject.id;


                    if (returnId == 0) {
                        document.getElementById("addContactResult").innerHTML = "Returned 0";
                    }
                    else if (returnId == -1) {
                        document.getElementById("addContactResult").innerHTML = "Contact added successfully.";
                        document.getElementById("addForm").reset();
                    }
                    else {
                        document.getElementById("addContactResult").innerHTML = "Returned other error:" + returnId;
                    }
                }
            };

            xhr.send(jsonPayload);
        }
        catch (err) {
            document.getElementById("contactAddResult").innerHTML = err.message;
        }
    }
}

function doDelete(contactId) {

    // contactId and userId should be provided by search function

    // let contactId = document.getElementById("contactId");
    // let userId = documnet.getElementById("userId");

    let returnId = -2;

    let tmp = { contactId: contactId, userId: userId };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let jsonObject = JSON.parse(xhr.responseText);
                returnId = jsonObject.id;

                if (returnId == contactId) {

                    document.getElementById("deleteContactResult").innerHTML = "Contact has been deleted.";
                    location.reload();
                }
                else if (returnId == 0) {
                    document.getElementById("deleteContactResult").innerHTML = "Requested contact not found. Deletion canceled.";
                }
                else {
                    document.getElementById("deleteContactResult").innerHTML = "Other error" + returnId;
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("deleteContactResult").innerHTML = err.message;
    }
}

function doUpdate(contactId) {

    // TODO holding place
    // sends updated info to the API similar to  creation but with conatct id
    // first and last name required, do not accept if either is blank
    // prepopulate with current data, that way the user only changes what they need

    // return value from API
    // -1 success, 0 error
    let returnId = -2;

    // control variables
    let fullName = false;
    let invalidPhone = false;
    let partialAddress = false;
    let completeAddress = false;
    let minimumContact = false;
    let validContact = false;

    // error messages
    let nameError = "First and last name required.";
    let phoneError = "Invalid phone number. Correct format: 555-555-5555";
    let addressError = "Partial address not allowed.";
    let contactMethodError = "At least one form of contact is required.";

    // form variables
    let newFirstName = document.getElementById("firstName").value;
    let newLastName = document.getElementById("lastName").value;
    let newPhoneNumber = document.getElementById("phoneNumber").value;
    let newEmail = document.getElementById("emailAddress").value;
    let newStreetAddress = document.getElementById("streetAddress").value;
    let newCity = document.getElementById("city").value;
    let newState = document.getElementById("state").value;
    let newZip = document.getElementById("zip").value;

    document.getElementById("updateResult").innerHTML = "";

    // Check for full name (required)

    if ((newFirstName != "") && (newLastName != "")) {
        fullName = true;
    }

    // Validate correct format of phone number

    if (newPhoneNumber != "") {

        var reg = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");

        if (!reg.test(newPhoneNumber)) {
            invalidPhone = true;
        }
    }

    // Check if any address fields are populated
    // This could mean a partial or full address. 
    // Partial addresses are not acceptable.

    if ((newStreetAddress != "") || (newCity != "") || (newState != "") || (newZip != "")) {

        if ((newStreetAddress == "") || (newCity == "") || (newState == "") || (newZip == "")) {
            partialAddress = true;
        }
        else {
            completeAddress = true;
        }
    }

    // Check that at least one form of contact is complete
    if ((newPhoneNumber != "") || (newEmail != "") || (completeAddress)) {
        minimumContact = true;
    }

    // Check if form is valid overall
    if ((fullName) && (!invalidPhone) && (!partialAddress) && (minimumContact)) {
        validContact = true;
    }
    else {

        if (!fullName) {
            document.getElementById("updateResult").innerHTML += nameError + '<br />';
        }

        if (invalidPhone) {
            document.getElementById("updateResult").innerHTML += phoneError + '<br />';
        }

        if (partialAddress) {
            document.getElementById("updateResult").innerHTML += addressError + '<br />';
        }

        if (!minimumContact) {
            document.getElementById("updateResult").innerHTML += contactMethodError + '<br />';
        }

    }

    // If form is valid, send contact to API
    if (validContact) {

        let tmp = {
            firstName: newFirstName, lastName: newLastName, phoneNumber: newPhoneNumber, emailAddress: newEmail,
            streetAddress: newStreetAddress, city: newCity, state: newState, zip: newZip, userId: userId, contactId: contactId
        };

        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/UpdateContact.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try {
            xhr.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    let jsonObject = JSON.parse(xhr.responseText);
                    returnId = jsonObject.id;

                    if (returnId == -1) {
                        document.getElementById("updateResult").innerHTML = "Contact has been updated.";
                    }
                    else {
                        document.getElementById("updateResult").innerHTML = "Update failed. Error: " + returnId;
                    }
                }
            };

            xhr.send(jsonPayload);
        }
        catch (err) {
            document.getElementById("updateResult").innerHTML = err.message;
        }
    }
}

function searchContacts() {

    let search = document.getElementById("searchText").value;

    document.getElementById("searchContactsResult").innerHTML = "";
    document.getElementById("updateForm").innerHTML = "";
    document.getElementById("addForm").innerHTML = "";

    let contactList = "";
    let returnId = -2;

    let tmp = { search: search, userId: userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let jsonObject = JSON.parse(xhr.responseText);
                returnId = jsonObject.id;

                if ((returnId == 0) && (search == "")) {

                    document.getElementById("searchContactsResult").innerHTML = "Contact list empty. Please add contacts.";
                    var table = document.getElementById("contactTable");
                    table.innerHTML = "";
                }
                else if ((returnId == 0) && (search != "")) {

                    document.getElementById("searchContactsResult").innerHTML = "Search complete. No matches found.";
                    var table = document.getElementById("contactTable");
                    table.innerHTML = "";
                }
                else if (returnId == -1) {


                    var table = document.getElementById("contactTable");

                    var contactId = -1;

                    var row = setTable();


                    for (let i = 0; i < jsonObject.results.length; i++) {

                        setRow(table, jsonObject, row, i, jsonObject.results[i].contactId);
                    }
                }else
                {

                     document.getElementById("searchContactsResult").innerHTML = "Returned other error:" + returnId;
                }
            }
        };
        xhr.send(jsonPayload);

        document.getElementById("searchText").value = "";
    }
    catch (err) {
        document.getElementById("searchContactsResult").innerHTML = err.message;
    }

}


// Intended to use with update
// Is supposed to populate the state field with the current contact's value
function getSelectedIndex(s, v) {

    var targetIndex = 0;

    for (var i = 0; i < s.options.length; i++) {

        if (s.options[i].text == v) {

            //s.options[i].selected = true;
            targetIndex = i;
            break;
        }

        return targetIndex;
    }
}

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

    var emailCell = row.insertCell(2);
    emailCell.innerHTML = jsonObject.results[i].phoneNumber;

    var phoneCell = row.insertCell(3);
    phoneCell.innerHTML = jsonObject.results[i].emailAddress;

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
    eButton.value = contactId;
    eButton.className = "iconButton";
    eButton.onclick = function () { editWindow(table, jsonObject, i) };
    eButton.innerHTML = '<span style="font-size: 1rem;"><span style="color: mediumseagreen;" ><i class="fas fa-edit"></i></span ></span >';
    editCell.appendChild(eButton);



    var deleteCell = row.insertCell(9);
    let dButton = document.createElement("button");
    dButton.name = "deleteButton";
    dButton.value = contactId;
    dButton.className = "iconButton";
    dButton.onclick = function () { deleteCheck(jsonObject.results[i].contactId) };
    dButton.innerHTML = '<span style="font-size: 1rem;"><span style="color: mediumseagreen;" ><i class="fas fa-trash-alt"></i></span ></span >';
    deleteCell.appendChild(dButton);
}

function editWindow(table, jsonObject, i) {



    var div = document.getElementById('addForm');



    document.getElementById("contactTable").innerHTML = "";

    var contactWindowDiv = document.getElementById('updateWindow');

    var div = document.getElementById('updateForm');

    document.getElementById('updateForm').innerHTML += '<input type="hidden" class="form-control" id="contactId">';
    document.getElementById('contactId').defaultValue = jsonObject.results[i].contactId;

    document.getElementById('updateForm').innerHTML += '<label for="firstName" class="form-label">First Name:</label>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control" id="firstName">';
    document.getElementById('firstName').defaultValue = jsonObject.results[i].firstName;

    document.getElementById('updateForm').innerHTML += '<label for="lastName" class="form-label">Last Name:</label>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control" id="lastName">';
    document.getElementById('lastName').defaultValue = jsonObject.results[i].lastName;

    document.getElementById('updateForm').innerHTML += '<label for="phoneNumber" class="form-label">Phone Number:</label>';
    document.getElementById('updateForm').innerHTML += '<input type="tel" class="form-control" id="phoneNumber" placeholder="phoneNumber">';
    document.getElementById('phoneNumber').defaultValue = jsonObject.results[i].phoneNumber;

    document.getElementById('updateForm').innerHTML += '<label for="emailAddress" class="form-label">Email Address:</label>';
    document.getElementById('updateForm').innerHTML += '<input type="email" class="form-control" id="emailAddress" placeholder="emailAddress">';
    document.getElementById('emailAddress').defaultValue = jsonObject.results[i].emailAddress;

    document.getElementById('updateForm').innerHTML += '<label for="streetAddress" class="form-label">Street Address:</label>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control" id="streetAddress" placeholder="streetAddress">';
    document.getElementById('streetAddress').defaultValue = jsonObject.results[i].streetAddress;

    document.getElementById('updateForm').innerHTML += '<label for="city" class="form-label">City:</label>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control" id="city" placeholder="city">';
    document.getElementById('city').defaultValue = jsonObject.results[i].city;

    document.getElementById('updateForm').innerHTML += '<label for="state" class="form-label">State:</label>';
    document.getElementById('updateForm').innerHTML += '<select class="form-select" id="state" required>';
    document.getElementById('state').innerHTML += '<option value=""></option>';
    document.getElementById('state').innerHTML += '<option>Alabama</option>'
    document.getElementById('state').innerHTML += '<option>Alaska</option>';
    document.getElementById('state').innerHTML += '<option>Arkansas</option>';
    document.getElementById('state').innerHTML += '<option>California</option>';
    document.getElementById('state').innerHTML += '<option>Colorado</option>';
    document.getElementById('state').innerHTML += '<option>Connecticut</option>';
    document.getElementById('state').innerHTML += '<option>Delaware</option>';
    document.getElementById('state').innerHTML += '<option>Florida</option>';
    document.getElementById('state').innerHTML += '<option>Georgia</option>';
    document.getElementById('state').innerHTML += '<option>Hawaii</option>';
    document.getElementById('state').innerHTML += '<option>Idaho</option>';
    document.getElementById('state').innerHTML += '<option>Illinois</option>';
    document.getElementById('state').innerHTML += '<option>Indiana</option>';
    document.getElementById('state').innerHTML += '<option>Iowa</option>';
    document.getElementById('state').innerHTML += '<option>Kansas</option>';
    document.getElementById('state').innerHTML += '<option>Kentucky</option>';
    document.getElementById('state').innerHTML += '<option>Louisiana</option>';
    document.getElementById('state').innerHTML += '<option>Maine</option>';
    document.getElementById('state').innerHTML += '<option>Maryland</option>';
    document.getElementById('state').innerHTML += '<option>Massachusetts</option>';
    document.getElementById('state').innerHTML += '<option>Michigan</option>';
    document.getElementById('state').innerHTML += '<option>Minnesota</option>';
    document.getElementById('state').innerHTML += '<option>Mississippi</option>';
    document.getElementById('state').innerHTML += '<option>Missouri</option>';
    document.getElementById('state').innerHTML += '<option>Montana</option>';
    document.getElementById('state').innerHTML += '<option>Nebraska</option>';
    document.getElementById('state').innerHTML += '<option>Nevada</option>';
    document.getElementById('state').innerHTML += '<option>New Hampshire</option>';
    document.getElementById('state').innerHTML += '<option>New Jersey</option>';
    document.getElementById('state').innerHTML += '<option>New Mexico</option>';
    document.getElementById('state').innerHTML += '<option>New York</option>';
    document.getElementById('state').innerHTML += '<option>North Carolina</option>';
    document.getElementById('state').innerHTML += '<option>North Dakota</option>';
    document.getElementById('state').innerHTML += '<option>Ohio</option>';
    document.getElementById('state').innerHTML += '<option>Oklahoma</option>';
    document.getElementById('state').innerHTML += '<option>Oregon</option>';
    document.getElementById('state').innerHTML += '<option>Pennsylvania</option>';
    document.getElementById('state').innerHTML += '<option>Rhode Island</option>';
    document.getElementById('state').innerHTML += '<option>South Carolina</option>';
    document.getElementById('state').innerHTML += '<option>South Dakota</option>';
    document.getElementById('state').innerHTML += '<option>Tennessee</option>';
    document.getElementById('state').innerHTML += '<option>Texas</option>';
    document.getElementById('state').innerHTML += '<option>Utah</option>';
    document.getElementById('state').innerHTML += '<option>Vermont</option>';
    document.getElementById('state').innerHTML += '<option>Virginia</option>';
    document.getElementById('state').innerHTML += '<option>Washington</option>';
    document.getElementById('state').innerHTML += '<option>West Virginia</option>';
    document.getElementById('state').innerHTML += '<option>Wisconsin</option>';
    document.getElementById('state').innerHTML += '<option>Wyoming</option>';

    var selected = document.createElement("option");
    selected.text = jsonObject.results[i].state;
    document.getElementById('state').options.add(selected, 0);

    document.getElementById('updateForm').innerHTML += '</select >';

    document.getElementById('updateForm').innerHTML += '<label for="zip" class="form-label">Zip:</label>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control" id="zip" placeholder="zip">';
    document.getElementById('zip').defaultValue = jsonObject.results[i].zip;

    var uButton = document.createElement("button");
    uButton.name = "updateButton";
    uButton.onclick = function () { doUpdate(jsonObject.results[i].contactId) };
    uButton.innerHTML = "Update Contact";
    document.getElementById("buttonDiv").appendChild(uButton);
  

}

function addWindow() {



    document.getElementById("contactTable").innerHTML = "";
    document.getElementById("addForm").innerHTML = "";
    document.getElementById("buttonDiv").innerHTML = "";

    var contactWindowDiv = document.getElementById('addWindow');

    var div = document.getElementById('addForm');

    document.getElementById('addForm').innerHTML += '<label for="firstName" class="form-label">First Name:</label>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control" id="firstName" placeholder="First Name *">';

    document.getElementById('addForm').innerHTML += '<label for="lastName" class="form-label">Last Name:</label>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control" id="lastName" placeholder="Last Name *">';

    document.getElementById('addForm').innerHTML += '<label for="phoneNumber" class="form-label">Phone Number:</label>';
    document.getElementById('addForm').innerHTML += '<input type="tel" class="form-control" id="phoneNumber" placeholder="Phone Number">';

    document.getElementById('addForm').innerHTML += '<label for="emailAddress" class="form-label">Email Address:</label>';
    document.getElementById('addForm').innerHTML += '<input type="email" class="form-control" id="emailAddress" placeholder="Email">';

    document.getElementById('addForm').innerHTML += '<label for="streetAddress" class="form-label">Street Address:</label>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control" id="streetAddress" placeholder="Street Address">';

    document.getElementById('addForm').innerHTML += '<label for="city" class="form-label">City:</label>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control" id="city" placeholder="City">';

    document.getElementById('addForm').innerHTML += '<label for="state" class="form-label">State:</label>';
    document.getElementById('addForm').innerHTML += '<select class="form-select" id="state" required>';
    document.getElementById('state').innerHTML += '<option selected disabled value="">Choose...</option>';
    document.getElementById('state').innerHTML += '<option>Alabama</option>'
    document.getElementById('state').innerHTML += '<option>Alaska</option>';
    document.getElementById('state').innerHTML += '<option>Arkansas</option>';
    document.getElementById('state').innerHTML += '<option>California</option>';
    document.getElementById('state').innerHTML += '<option>Colorado</option>';
    document.getElementById('state').innerHTML += '<option>Connecticut</option>';
    document.getElementById('state').innerHTML += '<option>Delaware</option>';
    document.getElementById('state').innerHTML += '<option>Florida</option>';
    document.getElementById('state').innerHTML += '<option>Georgia</option>';
    document.getElementById('state').innerHTML += '<option>Hawaii</option>';
    document.getElementById('state').innerHTML += '<option>Idaho</option>';
    document.getElementById('state').innerHTML += '<option>Illinois</option>';
    document.getElementById('state').innerHTML += '<option>Indiana</option>';
    document.getElementById('state').innerHTML += '<option>Iowa</option>';
    document.getElementById('state').innerHTML += '<option>Kansas</option>';
    document.getElementById('state').innerHTML += '<option>Kentucky</option>';
    document.getElementById('state').innerHTML += '<option>Louisiana</option>';
    document.getElementById('state').innerHTML += '<option>Maine</option>';
    document.getElementById('state').innerHTML += '<option>Maryland</option>';
    document.getElementById('state').innerHTML += '<option>Massachusetts</option>';
    document.getElementById('state').innerHTML += '<option>Michigan</option>';
    document.getElementById('state').innerHTML += '<option>Minnesota</option>';
    document.getElementById('state').innerHTML += '<option>Mississippi</option>';
    document.getElementById('state').innerHTML += '<option>Missouri</option>';
    document.getElementById('state').innerHTML += '<option>Montana</option>';
    document.getElementById('state').innerHTML += '<option>Nebraska</option>';
    document.getElementById('state').innerHTML += '<option>Nevada</option>';
    document.getElementById('state').innerHTML += '<option>New Hampshire</option>';
    document.getElementById('state').innerHTML += '<option>New Jersey</option>';
    document.getElementById('state').innerHTML += '<option>New Mexico</option>';
    document.getElementById('state').innerHTML += '<option>New York</option>';
    document.getElementById('state').innerHTML += '<option>North Carolina</option>';
    document.getElementById('state').innerHTML += '<option>North Dakota</option>';
    document.getElementById('state').innerHTML += '<option>Ohio</option>';
    document.getElementById('state').innerHTML += '<option>Oklahoma</option>';
    document.getElementById('state').innerHTML += '<option>Oregon</option>';
    document.getElementById('state').innerHTML += '<option>Pennsylvania</option>';
    document.getElementById('state').innerHTML += '<option>Rhode Island</option>';
    document.getElementById('state').innerHTML += '<option>South Carolina</option>';
    document.getElementById('state').innerHTML += '<option>South Dakota</option>';
    document.getElementById('state').innerHTML += '<option>Tennessee</option>';
    document.getElementById('state').innerHTML += '<option>Texas</option>';
    document.getElementById('state').innerHTML += '<option>Utah</option>';
    document.getElementById('state').innerHTML += '<option>Vermont</option>';
    document.getElementById('state').innerHTML += '<option>Virginia</option>';
    document.getElementById('state').innerHTML += '<option>Washington</option>';
    document.getElementById('state').innerHTML += '<option>West Virginia</option>';
    document.getElementById('state').innerHTML += '<option>Wisconsin</option>';
    document.getElementById('state').innerHTML += '<option>Wyoming</option>';

    document.getElementById('addForm').innerHTML += '</select >';

    document.getElementById('addForm').innerHTML += '<label for="zip" class="form-label">Zip:</label>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control" id="zip" placeholder="Zip">';

    var aButton = document.createElement("button");
    aButton.name = "addButton";
    aButton.onclick = function () { addContact() };
    aButton.innerHTML = "Add Contact";
    document.getElementById("buttonDiv").appendChild(aButton);


}



function deleteCheck(contactId) {

    if (confirm("Are you sure you want to delete this contact?") == true) {
        doDelete(contactId);
    }
}

function refreshContacts() {

    document.getElementById("searchText").value = "";
    document.getElementById("updateForm").innerHTML = "";
    document.getElementById("addForm").innerHTML = "";
    document.getElementById("buttonDiv").innerHTML = "";
    document.getElementById("updateResult").innerHTML = "";
    document.getElementById("addContactResult").innerHTML = "";
    document.getElementById("searchContactsResult").innerHTML = "";
    document.getElementById("deleteContactResult").innerHTML = "";
    searchContacts();
}
