const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const tasksFile = path.join(
    __dirname,
    "../data/tasks.json"
);


// ======================================
// READ TASKS
// ======================================

function getTasks() {

    const data = fs.readFileSync(
        tasksFile,
        "utf8"
    );

    return JSON.parse(data);

}


// ======================================
// SAVE TASKS
// ======================================

function saveTasks(tasks) {

    fs.writeFileSync(
        tasksFile,
        JSON.stringify(tasks, null, 2)
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
// GET ALL USER TASKS
// ======================================

router.get("/", requireLogin, (req, res) => {

    const tasks = getTasks();


    const userTasks = tasks.filter(

        task =>
            task.userId === req.session.userId

    );


    res.json({

        success: true,

        count: userTasks.length,

        tasks: userTasks

    });

});


// ======================================
// ADD TASK
// ======================================

router.post("/", requireLogin, (req, res) => {

    const {

        taskTitle,
        description,
        category,
        priority,
        dueDate,
        status

    } = req.body;


    if (!taskTitle) {

        return res.status(400).json({

            success: false,

            message: "Task title is required"

        });

    }


    const tasks = getTasks();


    const newTask = {

        id: Date.now(),

        userId: req.session.userId,

        taskTitle,

        description: description || "",

        category: category || "",

        priority: priority || "Low",

        dueDate: dueDate || "",

        status: status || "Pending",

        createdAt: new Date().toISOString()

    };


    tasks.push(newTask);

    saveTasks(tasks);


    res.status(201).json({

        success: true,

        message: "Task added successfully",

        task: newTask

    });

});


// ======================================
// GET SINGLE TASK
// ======================================

router.get("/:id", requireLogin, (req, res) => {

    const tasks = getTasks();

    const taskId = Number(req.params.id);


    const task = tasks.find(

        task =>

            task.id === taskId &&

            task.userId === req.session.userId

    );


    if (!task) {

        return res.status(404).json({

            success: false,

            message: "Task not found"

        });

    }


    res.json({

        success: true,

        task: task

    });

});


// ======================================
// EDIT TASK
// ======================================

router.put("/:id", requireLogin, (req, res) => {

    const tasks = getTasks();

    const taskId = Number(req.params.id);


    const taskIndex = tasks.findIndex(

        task =>

            task.id === taskId &&

            task.userId === req.session.userId

    );


    if (taskIndex === -1) {

        return res.status(404).json({

            success: false,

            message: "Task not found"

        });

    }


    const currentTask = tasks[taskIndex];


    tasks[taskIndex] = {

        ...currentTask,

        taskTitle:
            req.body.taskTitle ?? currentTask.taskTitle,

        description:
            req.body.description ?? currentTask.description,

        category:
            req.body.category ?? currentTask.category,

        priority:
            req.body.priority ?? currentTask.priority,

        dueDate:
            req.body.dueDate ?? currentTask.dueDate,

        status:
            req.body.status ?? currentTask.status,

        updatedAt: new Date().toISOString()

    };


    saveTasks(tasks);


    res.json({

        success: true,

        message: "Task updated successfully",

        task: tasks[taskIndex]

    });

});


// ======================================
// COMPLETE TASK
// ======================================

router.patch(
    "/:id/complete",
    requireLogin,
    (req, res) => {

        const tasks = getTasks();

        const taskId = Number(req.params.id);


        const task = tasks.find(

            task =>

                task.id === taskId &&

                task.userId === req.session.userId

        );


        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }


        task.status = "Completed";

        task.updatedAt =
            new Date().toISOString();


        saveTasks(tasks);


        res.json({

            success: true,

            message: "Task completed",

            task: task

        });

    }
);


// ======================================
// DELETE TASK
// ======================================

router.delete("/:id", requireLogin, (req, res) => {

    const tasks = getTasks();

    const taskId = Number(req.params.id);


    const taskIndex = tasks.findIndex(

        task =>

            task.id === taskId &&

            task.userId === req.session.userId

    );


    if (taskIndex === -1) {

        return res.status(404).json({

            success: false,

            message: "Task not found"

        });

    }


    const deletedTask =
        tasks.splice(taskIndex, 1)[0];


    saveTasks(tasks);


    res.json({

        success: true,

        message: "Task deleted successfully",

        task: deletedTask

    });

});


module.exports = router;