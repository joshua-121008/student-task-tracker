async function loadTaskChart() {

    try {

        const response = await fetch("/api/tasks");

        if (!response.ok) {
            console.error("Could not load tasks");
            return;
        }

        const data = await response.json();

        const tasks = data.tasks || [];

        let completed = 0;
        let pending = 0;
        let overdue = 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        tasks.forEach(task => {

            if (task.status === "completed") {
                completed++;
            } 
            else {

                if (task.dueDate) {

                    const dueDate = new Date(task.dueDate);
                    dueDate.setHours(0, 0, 0, 0);

                    if (dueDate < today) {
                        overdue++;
                    } 
                    else {
                        pending++;
                    }

                } else {
                    pending++;
                }
            }

        });


        const canvas = document.getElementById("taskChart");

        if (!canvas) {
            return;
        }


        new Chart(canvas, {

            type: "bar",

            data: {

                labels: [
                    "Completed",
                    "Pending",
                    "Overdue"
                ],

                datasets: [{
                    label: "Tasks",

                    data: [
                        completed,
                        pending,
                        overdue
                    ],

                    backgroundColor: [
                        "#1683ff",
                        "#7aaed6",
                        "#071a2b"
                    ],

                    borderRadius: 8,

                    borderWidth: 0
                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            stepSize: 1
                        },

                        grid: {
                            color: "#d6e7f5"
                        }

                    },

                    x: {

                        grid: {
                            display: false
                        }

                    }

                }

            }

        });

    } catch (error) {

        console.error(
            "Error loading task chart:",
            error
        );

    }

}


loadTaskChart();





