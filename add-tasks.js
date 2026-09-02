
// =====================================================
// J1 - ADD TASK
// JAVASCRIPT
// =====================================================


// Get the form
const taskForm = document.getElementById("taskForm");


// When the form is submitted
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Get values
    const taskTitle =
        document.getElementById("taskTitle").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const category =
        document.getElementById("category").value;

    const priority =
        document.getElementById("priority").value;

    const dueDate =
        document.getElementById("dueDate").value;

    const status =
        document.getElementById("status").value;


    // Validate title
    if (taskTitle === "") {

        showMessage("Please enter a task title.");

        return;
    }


    // Validate category
    if (category === "") {

        showMessage("Please select a category.");

        return;
    }


    // Validate priority
    if (priority === "") {

        showMessage("Please select a priority.");

        return;
    }


    // Create task
    const task = {

        id: Date.now(),

        title: taskTitle,

        description: description,

        category: category,

        priority: priority,

        dueDate: dueDate,

        status: status

    };


    // Get existing tasks
    let tasks =
        JSON.parse(localStorage.getItem("j1Tasks")) || [];


    // Add new task
    tasks.push(task);


    // Save tasks
    localStorage.setItem(
        "j1Tasks",
        JSON.stringify(tasks)
    );


    // Show success message
    showSuccess("Task added successfully!");


    // Clear form
    taskForm.reset();


    // Go to tasks page after a short delay
    setTimeout(function() {

        window.location.href = "tasks.html";

    }, 1000);

});


// =====================================================
// MESSAGE FUNCTIONS
// =====================================================


function showMessage(message) {

    const taskMessage =
        document.getElementById("taskMessage");

    taskMessage.textContent = message;

    taskMessage.className = "error-message";

}


function showSuccess(message) {

    const taskMessage =
        document.getElementById("taskMessage");

    taskMessage.textContent = message;

    taskMessage.className = "success-message";

}


// =====================================================
// JQUERY
// =====================================================


// Wait until the page is ready
$(document).ready(function() {


    // -------------------------------------------------
    // Form animation
    // -------------------------------------------------

    $(".add-task-card").hide();

    $(".add-task-card").fadeIn(500);


    // -------------------------------------------------
    // Input focus effect
    // -------------------------------------------------

    $("#taskTitle, #description, #category, #priority, #dueDate, #status")
        .focus(function() {

            $(this).addClass("input-focus");

        })
        .blur(function() {

            $(this).removeClass("input-focus");

        });


    // -------------------------------------------------
    // Reset button
    // -------------------------------------------------

    $("#resetTask").click(function() {

        $("#taskMessage")
            .fadeOut(150)
            .text("")
            .show();

    });


    // -------------------------------------------------
    // Save button animation
    // -------------------------------------------------

    $("#saveTask").hover(

        function() {

            $(this).stop().animate({
                opacity: 0.85
            }, 150);

        },

        function() {

            $(this).stop().animate({
                opacity: 1
            }, 150);

        }

    );


    // -------------------------------------------------
    // Description character counter
    // -------------------------------------------------

    $("#description").on("input", function() {

        const length = $(this).val().length;

        if (length > 300) {

            $(this).val(
                $(this).val().substring(0, 300)
            );

        }

    });


});

