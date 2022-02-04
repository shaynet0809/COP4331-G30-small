/** COP 4331-Spr22 Small Project Group 30 */

function addListener() {

    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var phoneNumber = document.getElementById("phoneNumber");
    var emailAddress = document.getElementById("emailAddress");
    var streetAddress = document.getElementById("streetAddress");
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    var zip = document.getElementById("zip");

    firstName.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
    lastName.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
    phoneNumber.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
    emailAddress.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
    streetAddress.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
    city.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
    state.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
    zip.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
}

function addWindow() {

    clearScreen();

    var contactWindowDiv = document.getElementById('addWindow');

    var div = document.getElementById('addForm');

    document.getElementById('addForm').innerHTML += '<b><label for="firstName" class="form-label">First Name:</label></b>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control mb-3" id="firstName" placeholder="First Name *" required>';

    document.getElementById('addForm').innerHTML += '<b><label for="lastName" class="form-label">Last Name:</label></b>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control mb-3" id="lastName" placeholder="Last Name *" required></b>';

    document.getElementById('addForm').innerHTML += '<b><label for="phoneNumber" class="form-label">Phone Number:</label>';
    document.getElementById('addForm').innerHTML += '<input type="tel" class="form-control mb-3" id="phoneNumber" placeholder="Phone Number"></b>';

    document.getElementById('addForm').innerHTML += '<b><label for="emailAddress" class="form-label">Email Address:</label></b>';
    document.getElementById('addForm').innerHTML += '<input type="email" class="form-control mb-3" id="emailAddress" placeholder="Email"></b>';

    document.getElementById('addForm').innerHTML += '<b><label for="streetAddress" class="form-label">Street Address:</label></b>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control mb-3" id="streetAddress" placeholder="Street Address">';

    document.getElementById('addForm').innerHTML += '<b><label for="city" class="form-label">City:</label></b>';
    document.getElementById('addForm').innerHTML += '<input type="text" class="form-control mb-3" id="city" placeholder="City"></b>';

    document.getElementById('addForm').innerHTML += '<b><label for="state" class="form-label">State:</label></b>';
    document.getElementById('addForm').innerHTML += '<select class="form-select mb-3" id="state" required>';
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

    document.getElementById('addForm').innerHTML += '<b><label for="zip" class="form-label">Zip:</label></b>';
    document.getElementById('addForm').innerHTML += '<input type="text" maxlength="5" pattern="[0-9]*" class="form-control mb-3" id="zip" placeholder="Zip">';

    var aButton = document.createElement("button");
    aButton.name = "addButton";
    aButton.id = "addButton";
    aButton.className = "btn mt-3";
    aButton.onclick = function () { addContact() };
    aButton.innerHTML = "Add Contact";
    document.getElementById("buttonDiv").appendChild(aButton);

    //addListener();


}

function clearScreen() {

    // clear table
    document.getElementById("contactTable").innerHTML = "";

    // clear forms
    document.getElementById("addForm").innerHTML = "";
    document.getElementById("updateForm").innerHTML = "";

    // clear submit buttons
    document.getElementById("buttonDiv").innerHTML = "";

    clearResults();

}

function clearResults() {

    // clear result messages
    document.getElementById("searchContactsResult").innerHTML = "";
    document.getElementById("deleteContactResult").innerHTML = "";
    document.getElementById("updateResult").innerHTML = "";
    document.getElementById("addContactResult").innerHTML = "";

}

function editListener() {

    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var phoneNumber = document.getElementById("phoneNumber");
    var emailAddress = document.getElementById("emailAddress");
    var streetAddress = document.getElementById("streetAddress");
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    var zip = document.getElementById("zip");

    firstName.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
    lastName.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
    phoneNumber.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
    emailAddress.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
    streetAddress.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
    city.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
    state.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
    zip.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("updateButton").click();
        }
    });
}

function editWindow(table, contactList, i) {

    clearScreen();

    var div = document.getElementById('updateForm');



    document.getElementById("contactTable").innerHTML = "";

    var contactWindowDiv = document.getElementById('updateWindow');

    var div = document.getElementById('updateForm');



    document.getElementById('updateForm').innerHTML += '<input type="hidden" class="form-control" id="contactId">';
    document.getElementById('contactId').defaultValue = contactList[i].contactId;

    document.getElementById('updateForm').innerHTML += '<b><label for="firstName" class="form-label">First Name:</label></b>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control" id="firstName" placeholder="First Name *" required>';
    document.getElementById('firstName').defaultValue = contactList[i].firstName;

    document.getElementById('updateForm').innerHTML += '<b><label for="lastName" class="form-label">Last Name:</label></b>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control mb-3" id="lastName" placeholder="Last Name *" required>';
    document.getElementById('lastName').defaultValue = contactList[i].lastName;

    document.getElementById('updateForm').innerHTML += '<b><label for="phoneNumber" class="form-label">Phone Number:</label></b>';
    document.getElementById('updateForm').innerHTML += '<input type="tel" class="form-control mb-3" id="phoneNumber" placeholder="Phone Number">';
    document.getElementById('phoneNumber').defaultValue = contactList[i].phoneNumber;

    document.getElementById('updateForm').innerHTML += '<b><label for="emailAddress" class="form-label">Email Address:</label></b>';
    document.getElementById('updateForm').innerHTML += '<input type="email" class="form-control mb-3" id="emailAddress" placeholder="Email">';
    document.getElementById('emailAddress').defaultValue = contactList[i].emailAddress;

    document.getElementById('updateForm').innerHTML += '<b><label for="streetAddress" class="form-label">Street Address:</label></b>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control mb-3" id="streetAddress" placeholder="Street Address">';
    document.getElementById('streetAddress').defaultValue = contactList[i].streetAddress;

    document.getElementById('updateForm').innerHTML += '<b><label for="city" class="form-label">City:</label></b>';
    document.getElementById('updateForm').innerHTML += '<input type="text" class="form-control mb-3" id="city" placeholder="City">';
    document.getElementById('city').defaultValue = contactList[i].city;

    document.getElementById('updateForm').innerHTML += '<b><label for="state" class="form-label">State:</label></b>';
    document.getElementById('updateForm').innerHTML += '<select class="form-select mb-3" id="state" required>';
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
    selected.text = contactList[i].state;
    document.getElementById('state').options.add(selected, 0);

    document.getElementById('updateForm').innerHTML += '</select >';

    document.getElementById('updateForm').innerHTML += '<b><label for="zip" class="form-label">Zip:</label></b>';
    document.getElementById('updateForm').innerHTML += '<input type="text" maxlength="5" pattern="[0-9]*" class="form-control mb-3" id="zip" placeholder="Zip">';
    document.getElementById('zip').defaultValue = contactList[i].zip;

    var uButton = document.createElement("button");
    uButton.name = "updateButton";
    uButton.id = "updateButton";
    uButton.className = "btn mt-3";
    uButton.onclick = function () { doUpdate(contactList[i].contactId) };
    uButton.innerHTML = "Update Contact";
    document.getElementById("buttonDiv").appendChild(uButton);

    editListener();


}

function getSelectedIndex(s, v) {

    var targetIndex = 0;

    for (var i = 0; i < s.options.length; i++) {

        if (s.options[i].text == v) {

            targetIndex = i;
            break;
        }

        return targetIndex;
    }
}

