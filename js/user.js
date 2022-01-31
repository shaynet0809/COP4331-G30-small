/** COP 4331-Spr22 Small Project Group 30 */

const urlBase = 'http://justkeeptesting.xyz/LAMPAPI';
const extension = 'php';


let userId = 0;
let firstName = "";
let lastName = "";

function doLogin() {

    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
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
                returnId = jsonObject.id;

                if (returnId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                userId = jsonObject.id;

                saveCookie();

                window.location.href = "mycontax.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function doRegister() {

    userId = 0;
    firstName = "";
    lastName = "";

    firstName = document.getElementById("newFirstName").value;
    lastName = document.getElementById("newLastName").value;
    let login = document.getElementById("newLogin").value;
    let password = document.getElementById("newPassword").value;
    var hash = md5(password);

    document.getElementById("registrationResult").innerHTML = "";

    let tmp = { firstName: firstName, lastName: lastName, login: login, password: hash };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Register.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    if ((firstName == "") || (lastName == "") || (login == "") || (password == "")) {
        document.getElementById("registrationResult").innerHTML = "All fields required";
        return;
    }

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                returnId = jsonObject.id;

                if (returnId == 0) {
                    document.getElementById("registrationResult").innerHTML = "User name already exists.";
                }
                else if (returnId == -1) {
                    document.getElementById("registrationResult").innerHTML = "Contact added successfully.";
                }
                else {
                    document.getElementById("registrationResult").innerHTML = "Returned other error:" + returnId;
                }

                window.location.href = "index.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("registrationResult").innerHTML = err.message;
    }
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
        document.getElementById("userName").innerHTML = "Hello " + firstName + " " + lastName + "!";
    }

}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}
