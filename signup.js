
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Get user input
    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    const message = document.getElementById("signupMessage");


    // Check password
    if (password !== confirmPassword) {

        message.textContent = "Passwords do not match.";

        return;
    }


    // Check password length
    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    // Check whether account already exists
    const existingUser =
        JSON.parse(localStorage.getItem("j1User"));


    if (existingUser) {

        if (existingUser.email === email) {

            message.textContent =
                "An account with this email already exists.";

            return;
        }
    }


    // Create new user
    const user = {

        name: name,

        age: "",

        location: "",

        school: "",

        college: "",

        degree: "",

        email: email,

        password: password

    };


    // Save user
    localStorage.setItem(
        "j1User",
        JSON.stringify(user)
    );


    // Login user automatically
    localStorage.setItem(
        "j1LoggedIn",
        "true"
    );


    // Success message
    message.textContent =
        "Account created successfully!";


    // Open dashboard
    setTimeout(function() {

        window.location.href = "index.html";

    }, 800);

});
