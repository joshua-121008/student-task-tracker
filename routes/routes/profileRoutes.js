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
// LOGIN CHECK
// ======================================

function requireLogin(req, res, next) {

    if (!req.session.userId) {

        return res.status(401).json({

            success: false,

            message: "Please login first"

        });

    }

    next();

}


// ======================================
// GET PROFILE
// ======================================

router.get("/", requireLogin, (req, res) => {

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

            email: user.email,

            age: user.age,

            location: user.location,

            school: user.school,

            college: user.college,

            degree: user.degree

        }

    });

});


// ======================================
// UPDATE PROFILE
// ======================================

router.put("/", requireLogin, (req, res) => {

    const users = getUsers();


    const userIndex = users.findIndex(

        user => user.id === req.session.userId

    );


    if (userIndex === -1) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }


    const user = users[userIndex];


    user.name =
        req.body.name ?? user.name;

    user.age =
        req.body.age ?? user.age;

    user.location =
        req.body.location ?? user.location;

    user.school =
        req.body.school ?? user.school;

    user.college =
        req.body.college ?? user.college;

    user.degree =
        req.body.degree ?? user.degree;


    user.updatedAt =
        new Date().toISOString();


    saveUsers(users);


    res.json({

        success: true,

        message: "Profile updated successfully",

        user: {

            id: user.id,

            name: user.name,

            email: user.email,

            age: user.age,

            location: user.location,

            school: user.school,

            college: user.college,

            degree: user.degree

        }

    });

});


module.exports = router;