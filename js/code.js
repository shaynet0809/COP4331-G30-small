/** COP 4331-Spr22 Small Project Group 30 */

const urlBase = 'http://justkeeptesting.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";


// TODO Write more specific search functions?
// TODO Write updateContact()
// TODO Write deleteContact()
// TODO Write doRegister() for creating logins, should redirect back to login.html or index.html on success

// Outstanding questions:
// When searching by first or last name do we need to functions or can one search both?
// What happens when some tries to modify or delete a non-existant contact (Create error handling)
// What happens when a user tries to add a duplicate user (Create error handling, maybe ask them if they'd like to update?, what field decides if it is duplicate?)

function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("loginName").value;
    var hash = md5(password);

    document.getElementById("loginResult").innerHTML = "";

    let tmp = { login: login, password: hash };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if (userId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "contacts.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}


function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName" + firstName + ",lastName=" + lastName + ",userId=" + "'expires=" + date.toGMTString();
}

function readCookie() {
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    }
    else {
        document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
    }

}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function addContact() {

    let newFirstName = document.getElementById("firstName").value;
    let newLastName = document.getElementById("lastName").value;
    let newPhoneNumber = document.getElementById("phoneNumber").value;
    let newEmail = document.getElementById("email").value;
    document.getElementById("contactAddResult").innerHTML = "";

    let tmp = { firstName: newFirstName, lastName: newLastName, phoneNumber: newPhoneNumber, email: newEmail, userId, userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/AddContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactAddResult").innerHTML = "Contact has been added";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }

}

/**
 * We need to decide if we allow searching by first or last name or anything else.
 * Can we search both fields in one function?
 *      - Possibly search last name first, add appropriate entries, then search first name and add appropriate entries who's key has not been used?
 *      - Maybe we could track keys with an array and mark an index as dirty if its key has been used in the search?
 * Does their need to be a seperate function for each?
 * How does this affect the API?
 * */

function searchContacts() {
    let srch = document.getElementById("searchText").value;
    document.getElementById("contactSearchResult").innerHTML = "";

    let contactList = "";

    let tmp = { search: srch, userId: userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchContacts.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactSearchResult").innerHTML = "Contacts(s) has been retrieved";
                let jsonObject = JSON.parse(xhr.responseText);

                for (let i = 0; i < jsonObject.results.length; i++) {
                    contactList += jsonObject.results[i];
                    if (i < jsonObject.results.length - 1) {
                        contactList += "<br />\r\n";
                    }
                }

                document.getElementsByTagName("p")[0].innerHTML = contactList;
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) 
    {
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }

}


function doUpdate() {

    // TODO holding place
    // Needs error handling to check if contact exits. Not sure if this handling needs to be in front end or API
    // recives contact data from searh function
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
    

    try 
    {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err)
    {
        document.getElementById("updateResult").innerHTML = err.message;
    }
}

function doDelete() {

    // TODO holding place
    // Needs error handling to check if contact exits. Not sure if this handling needs to be in front end or API
    // contactId and userId should be provided by search function

    // let contactId = document.getElementById("contactId");
    // let userId = documnet.getElementById("userId");

    let tmp = { contactId: contactId, userId: userId };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try 
    {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err)
    {
        document.getElementById("deleteResult").innerHTML = err.message;
    }
}