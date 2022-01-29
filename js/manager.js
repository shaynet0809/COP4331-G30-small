/** COP 4331-Spr22 Small Project Group 30 */

function addContact() {

    // return value from API
    // -1 success, 0 error
    let returnId = -2;

    // control variables
    let fullName = false;
    let partialAddress = false;
    let completeAddress = false;
    let minimumContact = false;
    let validContact = false;

    // error messages
    let nameError = "First and last name required.";
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
    if ((fullName) && (!partialAddress) && (minimumContact)) {
        validContact = true;
    }
    else {

        if (!fullName) {
            document.getElementById("contactAddResult").innerHTML += nameError + '<br />';
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

function doDelete() {

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
                    document.getElementsByTagName("p")[0].innerHTML = "";
                }
                else if (returnId == -1) {

                    for (let i = 0; i < jsonObject.results.length; i++) {
                        contactList +="Name: " + jsonObject.results[i].lastName + ", " + jsonObject.results[i].firstName + " Email: " + jsonObject.results[i].emailAddress +
                            " Phone: " + jsonObject.results[i].phoneNumber + " Street Address: " + jsonObject.results[i].streetAddress +
                            " City: " + jsonObject.results[i].city + " State: " + jsonObject.results[i].state + " Zip: " + jsonObject.results[i].zip;
                        if (i < jsonObject.results.length - 1) {
                            contactList += "<br />\r\n";
                        }
                    }
                    /*
                    var table = document.getElementById("contactTable");


                    for (let i = 0; i < jsonObject.results.length; i++) {

                        var row = table.insertRow(i);

                        var cell1 = row.insertCell(jsonObject.results[i].contactId);
                        var cell2 = row.insertCell(jsonObject.results[i].lastName);
                        var cell3 = row.insertCell(jsonObject.results[i].firstName);
                        var cell4 = row.insertCell(jsonObject.results[i].email);
                        var cell5 = row.insertCell(jsonObject.results[i].phoneNumber);
                        var cell6 = row.insertCell(jsonObject.results[i].streetAddress);
                        var cell7 = row.insertCell(jsonObject.results[i].city);
                        var cell8 = row.insertCell(jsonObject.results[i].state);
                        var cell9 = row.insertCell(jsonObject.results[i].zip);

                    }*/
                    


                    document.getElementsByTagName("p")[0].innerHTML = contactList;
                }
                else {
                    document.getElementById("searchContactsResult").innerHTML = "Returned other error:" + returnId;
                }



                // TODO load list of contacts into dropdown box or similar object
                // when user submits selection, change contactSelected to "true"


                /** 
                 if (contactSelected == true) {
                     
                     document.getElementById("conditionalUpdate").innerHTML = '<a href="http://justkeeptesting.xyz/update-contact.html"><button>Update Contact</button></a>';
                     document.getElementById("conditionalDelte").innerHTML = '<button type="button" id="deleteButton" class="buttons" onclick="doDelete();"> Delete Contact </button>';
 
                 }
                 */

            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        // TODO ask API if they can add an error for zero results found
        document.getElementById("searchContactsResult").innerHTML = err.message;
    }

}

function setSelectedIndex(s, v) {

    for (var i = 0; i < s.options.length; i++) {

        if (s.options[i].text == v) {

            s.options[i].selected = true;

            return;
        }
    }
}