const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

const PORT = 3000;


// ======================================
// MIDDLEWARE
// ======================================

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


// ======================================
// STATIC FILES
// ======================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ======================================
// SESSION
// ======================================

app.use(
    session({
        secret: "j1-secret-key",

        resave: false,

        saveUninitialized: false,

        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);


// ======================================
// EJS
// ======================================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ======================================
// TEST PAGE
// ======================================

app.get("/", (req, res) => {

    res.send(
        "J1 Student Task Manager Backend is running!"
    );

});


// ======================================
// API ROUTES
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/profile", profileRoutes);


// ======================================
// 404
// ======================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API route not found"

    });

});


// ======================================
// SERVER
// ======================================

app.listen(PORT, () => {

    console.log(
        `J1 Server running on http://localhost:${PORT}`
    );

});