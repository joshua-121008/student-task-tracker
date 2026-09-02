const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFile = path.join(
    __dirname,
    "../data/users.json"
);


// ======================================
// READ USERS
// ======================================

function getUsers() {

    const data = fs.readFileSync(
        usersFile,
        "utf8"
    );

    return JSON.parse(data);

}


// ======================================
// SAVE USERS
// ======================================

function saveUsers(users) {

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );

}


// ======================================
// SIGNUP
// ======================================

router.post("/signup", (req, res) => {

    const {
        name,
        email,
        password,
        confirmPassword
    } = req.body;


    if (!name || !email || !password) {

        return res.status(400).json({

            success: false,

            message: "Name, email and password are required"

        });

    }


    if (password !== confirmPassword) {

        return res.status(400).json({

            success: false,

            message: "Passwords do not match"

        });

    }


    const users = getUsers();


    const existingUser = users.find(
        user =>
            user.email.toLowerCase() ===
            email.toLowerCase()
    );


    if (existingUser) {

        return res.status(409).json({

            success: false,

            message: "Email already registered"

        });

    }


    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

        age: "",

        location: "",

        school: "",

        college: "",

        degree: "",

        createdAt: new Date().toISOString()

    };


    users.push(newUser);

    saveUsers(users);


    res.status(201).json({

        success: true,

        message: "Account created successfully",

        user: {

            id: newUser.id,

            name: newUser.name,

            email: newUser.email

        }

    });

});


// ======================================
// LOGIN
// ======================================

router.post("/login", (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({

            success: false,

            message: "Email and password are required"

        });

    }


    const users = getUsers();


    const user = users.find(

        user =>

            user.email.toLowerCase() ===
            email.toLowerCase() &&

            user.password === password

    );


    if (!user) {

        return res.status(401).json({

            success: false,

            message: "Invalid email or password"

        });

    }


    req.session.userId = user.id;


    res.json({

        success: true,

        message: "Login successful",

        user: {

            id: user.id,

            name: user.name,

            email: user.email

        }

    });

});


// ======================================
// LOGOUT
// ======================================

router.post("/logout", (req, res) => {

    req.session.destroy((error) => {

        if (error) {

            return res.status(500).json({

                success: false,

                message: "Logout failed"

            });

        }


        res.json({

            success: true,

            message: "Logged out successfully"

        });

    });

});


// ======================================
// CHECK LOGIN
// ======================================

router.get("/me", (req, res) => {

    if (!req.session.userId) {

        return res.status(401).json({

            success: false,

            message: "Not logged in"

        });

    }


    const users = getUsers();


    const user = users.find(

        user => user.id === req.session.userId

    );


    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }


    res.json({

        success: true,

        user: {

            id: user.id,

            name: user.name,

            email: user.email

        }

    });

});


module.exports = router;