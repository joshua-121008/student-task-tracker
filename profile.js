
// Get logged-in status
const loggedIn = localStorage.getItem("j1LoggedIn");


// If user is not logged in
if (loggedIn !== "true") {

    window.location.href = "login.html";

}


// Get user information
const user = JSON.parse(
    localStorage.getItem("j1User")
);


// Display user information
if (user) {

    document.getElementById("userName").textContent =
        user.name || "Not added";

    document.getElementById("userAge").textContent =
        user.age || "Not added";

    document.getElementById("userLocation").textContent =
        user.location || "Not added";

    document.getElementById("userSchool").textContent =
        user.school || "Not added";

    document.getElementById("userCollege").textContent =
        user.college || "Not added";

    document.getElementById("userDegree").textContent =
        user.degree || "Not added";

    document.getElementById("userEmail").textContent =
        user.email || "Not added";
