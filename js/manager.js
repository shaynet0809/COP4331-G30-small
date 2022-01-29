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
    let newEmail = document.getElementById("email").value;
    let newStreetAddress = document.getElementById("streetAddress").value;
    let newCity = document.getElementById("city").value;
    let newState = document.getElementById("state").value;
    let newZip = document.getElementById("zip").value;

    document.getElementById("contactAddResult").innerHTML = "";

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
            document.getElementById("contactAddResult").innerHTML += nameError + '<br />';
        }

        if (invalidPhone) {
            document.getElementById("contactAddResult").innerHTML += phoneError + '<br />';
        }

        if (partialAddress) {
            document.getElementById("contactAddResult").innerHTML += addressError + '<br />';
        }

        if (!minimumContact) {
            document.getElementById("contactAddResult").innerHTML += contactMethodError + '<br />';
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
                        document.getElementById("contactAddResult").innerHTML = "Returned 0";
                    }
                    else if (returnId == -1) {
                        document.getElementById("contactAddResult").innerHTML = "Contact added successfully.";
                        document.getElementById("addForm").reset();
                    }
                    else {
                        document.getElementById("contactAddResult").innerHTML = "Returned other error:" + returnId;
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

function doDelete(contactId, userId) {

    // contactId and userId should be provided by search function

    // let contactId = document.getElementById("contactId");
    // let userId = documnet.getElementById("userId");

    let tmp = { contactId: contactId, userId: userId };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted.";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("deleteResult").innerHTML = err.message;
    }
}

function doUpdate() {

    // TODO holding place
    // sends updated info to the API similar to  creation but with conatct id
    // first and last name required, do not accept if either is blank
    // prepopulate with current data, that way the user only changes what they need

    let updatedFirstName = document.getElementById("firstName").value;
    let updatedLastName = document.getElementById("lastName").value;
    let updatedPhoneNumber = document.getElementById("phoneNumber").value;
    let updatedEmail = document.getElementById("email").value;

    // contactId and userId should be sent/chosen by search function

    document.getElementById("contactAddResult").innerHTML = "";

    let tmp = { contactId: contactId, firstName: newFirstName, lastName: newLastName, phoneNumber: newPhoneNumber, email: newEmail, userId, userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/UpdateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated.";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("updateResult").innerHTML = err.message;
    }
}

function searchContacts() {

    let search = document.getElementById("searchText").value;

    document.getElementById("searchContactsResult").innerHTML = "";

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

                if (returnId == 0) {
                    document.getElementById("searchContactsResult").innerHTML = "Search completed without matches.";
                    var table = document.getElementById("contactTable");
                    table.innerHTML = "";
                }
                else if (returnId == -1) {


                    var table = document.getElementById("contactTable");

                    table.innerHTML = "";

                    var row = table.insertRow(0);

                    var lastNameCell = row.insertCell(0);
                    lastNameCell.innerHTML = "Last Name";

                    var firstNameCell = row.insertCell(1);
                    firstNameCell.innerHTML = "First Name";

                    var emailCell = row.insertCell(2);
                    emailCell.innerHTML = "Email";

                    var phoneCell = row.insertCell(3);
                    phoneCell.innerHTML = "Phone";

                    var streetAddressCell = row.insertCell(4);
                    streetAddressCell.innerHTML = "Street Address";

                    var cityCell = row.insertCell(5);
                    cityCell.innerHTML = "City";

                    var stateCell = row.insertCell(6);
                    stateCell.innerHTML = "State";

                    var zipCell = row.insertCell(7);
                    zipCell.innerHTML = "Zip";

                    var editCell = row.insertCell(8)
                    editCell.innerHTML = "Edit";

                    var deleteCell = row.insertCell(9)
                    deleteCell.innerHTML = "Delete";


                    for (let i = 0; i < jsonObject.results.length; i++) {


                        row = table.insertRow(1);

                        var lastNameCell = row.insertCell(0);
                        lastNameCell.innerHTML = jsonObject.results[i].lastName;

                        var firstNameCell = row.insertCell(1);
                        firstNameCell.innerHTML = jsonObject.results[i].firstName;

                        var emailCell = row.insertCell(2);
                        emailCell.innerHTML = jsonObject.results[i].emailAddress;

                        var phoneCell = row.insertCell(3);
                        phoneCell.innerHTML = jsonObject.results[i].phoneNumber;

                        var streetAddressCell = row.insertCell(4);
                        streetAddressCell.innerHTML = jsonObject.results[i].streetAddress;

                        var cityCell = row.insertCell(5);
                        cityCell.innerHTML = jsonObject.results[i].city;

                        var stateCell = row.insertCell(6);
                        stateCell.innerHTML = jsonObject.results[i].state;

                        var zipCell = row.insertCell(7);
                        zipCell.innerHTML = jsonObject.results[i].zip;

                        var editCell = row.insertCell(8)
                        editCell.innerHTML = '<button outline="none" onclick=window.location="update-contact.html"><span style="font-size: 1rem;"><span style = "color: mediumseagreen;" ><i class="fas fa-edit"></i></span ></span ></button>';

                        var deleteCell = row.insertCell(9)
                        deleteCell.innerHTML = '<button outline="none" onclick="doDelete(jsonObject.results[i].contactId, jsonObject.results[i].userId)"><span style="font-size: 1rem;"><span style = "color: mediumseagreen;" ><i class="fas fa-trash-alt"></i></span ></span ></button>';




                    }
                }else
                {

                     document.getElementById("searchContactsResult").innerHTML = "Returned other error:" + returnId;
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("searchContactsResult").innerHTML = err.message;
    }

}


// Intended to use with update
// Is supposed to populate the state field with the current contact's value
function setSelectedIndex(s, v) {

    for (var i = 0; i < s.options.length; i++) {

        if (s.options[i].text == v) {

            s.options[i].selected = true;

            return;
        }
    }
}