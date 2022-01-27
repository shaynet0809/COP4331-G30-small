/** COP 4331-Spr22 Small Project Group 30 */

const urlBase   = 'http://justkeeptesting.xyz/LAMPAPI';
const extension = 'php';


let userId    = 0;
let firstName = "";
let lastName = "";


// TODO Write more specific search functions?
// TODO Write updateContact()
// TODO Write deleteContact()

// Outstanding questions:
// When searching by first or last name do we need to functions or can one search both?
// What happens when some tries to modify or delete a non-existant contact (Create error handling)
// What happens when a user tries to add a duplicate user (Create error handling, maybe ask them if they'd like to update?, what field decides if it is duplicate?)





// might not be necessary, still researching how to transition from the submit button on the drop down box

function displayContact() {


    
    
    document.getElementById("conditionalUpdate").innerHTML = '<a href="http://justkeeptesting.xyz/update-contact.html"><button>Update Contact</button></a>';
    document.getElementById("conditionalDelte").innerHTML = '<button type="button" id="deleteButton" class="buttons" onclick="doDelete();"> Delete Contact </button>';


}

function readCookie()
{

    userId = -1;

    let data = document.cookie;
    let splits = data.split(",");

    for (var i = 0; i < splits.length; i++)
    {

        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");

        if (tokens[0] == "firstName")
        {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName")
        {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userId")
        {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    }
    else {
        document.getElementById("userName").innerHTML = "Welcome " + firstName + " " + lastName;
    }

}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function fuzzySearch() {
    const options = {
        isCaseSensitive: true,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "firstName",
            "lastName"
        ]
    };

    const pattern = "";

    return fuse.search(pattern);
    const fuse = new Fuse(contactList, options);
}
















