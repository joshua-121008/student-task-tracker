document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;

        const message =
            document.getElementById("loginMessage");

        const button =
            document.querySelector(".login-button");


        /* Clear old message */

        message.textContent = "";
        message.className = "login-message";


        /* Disable button */

        button.disabled = true;
        button.textContent = "Logging in...";


        try {

            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            /* LOGIN FAILED */

            if (!response.ok) {

                message.textContent =
                    data.message ||
                    "Invalid email or password.";

                message.classList.add("error");

                button.disabled = false;
                button.textContent = "Login";

                return;
            }


            /* LOGIN SUCCESS */

            message.textContent =
                "Login successful!";

            message.classList.add("success");


            /*
             * Express session is now created.
             * No localStorage login flag is required.
             */

            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 700);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            message.textContent =
                "Unable to connect to server.";

            message.classList.add("error");

            button.disabled = false;
            button.textContent = "Login";
        }

    });


    
