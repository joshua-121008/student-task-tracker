// =====================================================
// J1 - TASKS
// =====================================================


// Get task container

const taskContainer =
    document.getElementById("taskContainer");


// Get tasks from localStorage

let tasks =
    JSON.parse(localStorage.getItem("j1Tasks")) || [];


// Current filter

let currentFilter = "all";


// Task selected for deletion

let deleteTaskId = null;


// Task selected for editing

let editTaskId = null;


// =====================================================
// DISPLAY TASKS
// =====================================================

function displayTasks() {

    taskContainer.innerHTML = "";


    // Filter tasks

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "completed") {

            return task.status === "Completed";

        }

        if (currentFilter === "pending") {

            return task.status === "Pending";

        }

        return true;

    });


    // No tasks

    if (filteredTasks.length === 0) {

        taskContainer.innerHTML = `
            <div class="no-tasks">
                <h3>No tasks found</h3>
                <p>Add a new task to get started.</p>
            </div>
        `;

        return;

    }


    // Create task cards

    filteredTasks.forEach(function(task) {

        const taskCard =
            document.createElement("div");


        taskCard.className = "task-card";


        taskCard.dataset.id = task.id;


        taskCard.innerHTML = `

            <h3>${task.title}</h3>

            <p>${task.description || "No description"}</p>

            <p>
                <strong>Category:</strong>
                ${task.category}
            </p>

            <p>
                <strong>Due Date:</strong>
                ${task.dueDate || "No due date"}
            </p>

            <p>
                <strong>Priority:</strong>
                ${task.priority}
            </p>

            <p>
                <strong>Status:</strong>
                ${task.status}
            </p>


            <div class="task-actions">

                ${
                    task.status === "Pending"
                    ?
                    `<button
                        class="complete-btn"
                        data-id="${task.id}">
                        Complete
                    </button>`
                    :
                    `<button
                        class="pending-btn"
                        data-id="${task.id}">
                        Mark Pending
                    </button>`
                }


                <button
                    class="edit-btn"
                    data-id="${task.id}">
                    Edit
                </button>


                <button
                    class="delete-btn"
                    data-id="${task.id}">
                    Delete
                </button>

            </div>

        `;


        taskContainer.appendChild(taskCard);

    });

}


// =====================================================
// SAVE TASKS
// =====================================================

function saveTasks() {

    localStorage.setItem(
        "j1Tasks",
        JSON.stringify(tasks)
    );

}


// =====================================================
// COMPLETE TASK
// =====================================================

function completeTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.status = "Completed";

        }

    });


    saveTasks();

    displayTasks();

}


// =====================================================
// MARK PENDING
// =====================================================

function markPending(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.status = "Pending";

        }

    });


    saveTasks();

    displayTasks();

}


// =====================================================
// DELETE TASK
// =====================================================

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// =====================================================
// EDIT TASK
// =====================================================

function openEditDialog(id) {

    const task =
        tasks.find(function(task) {

            return task.id === id;

        });


    if (!task) return;


    editTaskId = id;


    document.getElementById("editTitle").value =
        task.title;

    document.getElementById("editDescription").value =
        task.description;

    document.getElementById("editCategory").value =
        task.category;

    document.getElementById("editPriority").value =
        task.priority;

    document.getElementById("editDueDate").value =
        task.dueDate;

    document.getElementById("editStatus").value =
        task.status;


    document
        .getElementById("editDialog")
        .showModal();

}


// =====================================================
// SAVE EDIT
// =====================================================

document
    .getElementById("editForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const task =
            tasks.find(function(task) {

                return task.id === editTaskId;

            });


        if (!task) return;


        task.title =
            document.getElementById("editTitle").value.trim();


        task.description =
            document.getElementById("editDescription").value.trim();


        task.category =
            document.getElementById("editCategory").value;


        task.priority =
            document.getElementById("editPriority").value;


        task.dueDate =
            document.getElementById("editDueDate").value;


        task.status =
            document.getElementById("editStatus").value;


        saveTasks();

        displayTasks();


        document
            .getElementById("editDialog")
            .close();

    });


// =====================================================
// CANCEL EDIT
// =====================================================

document
    .getElementById("cancelEdit")
    .addEventListener("click", function() {

        document
            .getElementById("editDialog")
            .close();

    });


// =====================================================
// CLICK EVENTS
// =====================================================

taskContainer.addEventListener(
    "click",
    function(event) {


        const id =
            Number(event.target.dataset.id);


        if (!id) return;


        // Complete

        if (
            event.target.classList.contains(
                "complete-btn"
            )
        ) {

            completeTask(id);

        }


        // Pending

        if (
            event.target.classList.contains(
                "pending-btn"
            )
        ) {

            markPending(id);

        }


        // Edit

        if (
            event.target.classList.contains(
                "edit-btn"
            )
        ) {

            openEditDialog(id);

        }


        // Delete

        if (
            event.target.classList.contains(
                "delete-btn"
            )
        ) {

            deleteTaskId = id;


            document
                .getElementById("deleteDialog")
                .showModal();

        }

    }
);


// =====================================================
// DELETE CONFIRMATION
// =====================================================

document
    .getElementById("confirmDelete")
    .addEventListener("click", function() {

        if (deleteTaskId !== null) {

            deleteTask(deleteTaskId);

        }


        deleteTaskId = null;


        document
            .getElementById("deleteDialog")
            .close();

    });


// Cancel delete

document
    .getElementById("cancelDelete")
    .addEventListener("click", function() {

        deleteTaskId = null;

        document
            .getElementById("deleteDialog")
            .close();

    });


// =====================================================
// FILTER BUTTONS
// =====================================================

document
    .getElementById("allBtn")
    .addEventListener("click", function() {

        currentFilter = "all";

        displayTasks();

    });


document
    .getElementById("completedBtn")
    .addEventListener("click", function() {

        currentFilter = "completed";

        displayTasks();

    });


document
    .getElementById("pendingBtn")
    .addEventListener("click", function() {

        currentFilter = "pending";

        displayTasks();

    });


// =====================================================
// JQUERY
// =====================================================

$(document).ready(function() {


    // Animate task container

    $(".task-container").hide();

    $(".task-container").fadeIn(500);


    // Filter button animation

    $(".buttons button").hover(

        function() {

            $(this).stop().animate({
                opacity: 0.75
            }, 150);

        },

        function() {

            $(this).stop().animate({
                opacity: 1
            }, 150);

        }

    );


    // Task card hover

    $(document).on(
        "mouseenter",
        ".task-card",
        function() {

            $(this).stop().animate({
                opacity: 0.95
            }, 150);

        }
    );


    $(document).on(
        "mouseleave",
        ".task-card",
        function() {

            $(this).stop().animate({
                opacity: 1
            }, 150);

        }
    );

});


// =====================================================
// INITIAL DISPLAY
// =====================================================

displayTasks();