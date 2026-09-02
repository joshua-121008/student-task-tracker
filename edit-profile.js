
// Get the profile form
const profileForm = document.getElementById("profileForm");


// Load previously saved user
const savedUser = JSON.parse(localStorage.getItem("j1User"));


if (savedUser) {

    document.getElementById("name").value =
        savedUser.name || "";

    document.getElementById("age").value =
        savedUser.age || "";

    document.getElementById("location").value =
        savedUser.location || "";

    document.getElementById("school").value =
        savedUser.school || "";

    document.getElementById("college").value =
        savedUser.college || "";

    document.getElementById("degree").value =
        savedUser.degree || "";

    document.getElementById("email").value =
        savedUser.email || "";

    document.getElementById("password").value =
        savedUser.password || "";

}


// Save profile
profileForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const user = {

        name: document.getElementById("name").value,

        age: document.getElementById("age").value,

        location: document.getElementById("location").value,

        school: document.getElementById("school").value,

        college: document.getElementById("college").value,

        degree: document.getElementById("degree").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };


    // Save user
    localStorage.setItem(
        "j1User",
        JSON.stringify(user)
    );


    // Mark user as logged in
    localStorage.setItem(
        "j1LoggedIn",
        "true"
    );


    alert("Profile saved successfully!");


    // Go to dashboard
    window.location.href = "index.html";

});

