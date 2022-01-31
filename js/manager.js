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
                        location.reload();
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

function deleteCheck(contactId) {

    if (confirm("Are you sure you want to delete this contact?") == true) {
        doDelete(contactId);
    }
}

function doDelete(contactId) {


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
                        location.reload();
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

                    contactList = jsonObject.results;

                    contactList = sortContacts(contactList);


                    contactList = reverseContacts(contactList); 


                    for (let i = 0; i < contactList.length; i++) {

                        setRow(table, contactList, row, i, contactList[i].contactId);
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


function sortContacts(contactList) {


    contactList.sort(function (a, b) {
        var nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return contactList;

}


function reverseContacts(contactList) {

    contactList.sort(function (a, b) {
        var nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return contactList;
}


function sortSwitch(contactList) {

    var table = document.getElementById("contactTable");

    var contactId = -1;

    var row = setTable(contactList);

    contactList = reverseContacts(contactList);


    for (let i = 0; i < contactList.length; i++) {

        setRow(table, contactList, row, i, contactList[i].contactId);
    }
}