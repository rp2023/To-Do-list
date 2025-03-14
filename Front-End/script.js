const apiUrl = "https://gjxbjylila.execute-api.ap-south-1.amazonaws.com/Prod";

//Function to add a new task
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskId = prompt("Enter task ID:");
        if (taskId === null) {
			taskInput.value = '';
            return; 
        }

        checkIfTaskIdExists(taskId).then(exists => {
            if (exists) {
                alert("Task ID already exists. Please enter a different Task ID.");
            } else {
                const taskDescription = prompt("Enter task description:");
                if (taskDescription === null) {
					taskInput.value = '';
                    return; 
                }

                const taskStatus = prompt("Enter task status:");
                if (taskStatus === null) {
					taskInput.value = '';
                    return; 
                }
                const taskData = {
                    TaskID: taskId,
                    TaskName: taskText,
                    TaskDescription: taskDescription,
                    TaskStatus: taskStatus
                };

                fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(taskData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Task added successfully:", data);
                    taskInput.value = ''; 
                    if (document.getElementById('task-table').style.display === 'table') {
                        getAllTasks(); 
                    }
                    displayConfirmationMessage();
                })
                .catch(error => {
                    console.error("Error adding task:", error);
                    alert("Failed to add task. Please try again.");
                });
            }
        }).catch(error => {
            console.error("Error checking task ID:", error);
            alert("Failed to check task ID. Please try again.");
        });
    }
}

// Function to check if TaskID exists
function checkIfTaskIdExists(taskID) {
    return fetch(`${apiUrl}?TaskID=${taskID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.body) {
            data = JSON.parse(data.body); 
        }
        console.log("Check TaskID Response:", data);
        return data && data.TaskID === taskID;
    })
    .catch(error => {
        console.error("Error checking task ID:", error);
        return false;
    });
}

// Function to display confirmation message
function displayConfirmationMessage() {
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000); 
}

// Function to delete a task and remove it from the DOM
function deleteTask(taskID) {
    fetch(`${apiUrl}?TaskID=${taskID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Task deleted successfully:", data);
        removeTaskFromDOM(taskID);
        if (document.getElementById('task-table').style.display === 'table') {
            getAllTasks();
        }
    })
    .catch(error => {
        console.error("Error deleting task:", error);
    });
}

// Function to remove a task element from the DOM
function removeTaskFromDOM(taskID) {
    const taskElement = document.querySelector(`[data-task-id='${taskID}']`);
    if (taskElement) {
        taskElement.remove();
    }
}

// Function to delete a task by ID
function deleteTaskById() {
    const taskIDInput = document.getElementById('delete-task-id');
    const taskID = taskIDInput.value.trim();

    if (taskID) {
        deleteTask(taskID);
        taskIDInput.value = '';
    } else {
        alert("Please enter a Task ID.");
    }
}

// Function to get all tasks from the database and display them in a table
function getAllTasks() {
    document.getElementById('task-table').style.display = 'table';
    const cacheBuster = new Date().getTime(); // Unique timestamp to avoid caching
    fetch(`${apiUrl}?TaskID=all&cb=${cacheBuster}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
    })
    .then(response => response.json())
    .then(data => {
        if (data.body) {
            data = JSON.parse(data.body);
        }
        console.log("All Tasks:", data);
        displayTasksInTable(data);
    })
    .catch(error => {
        console.error("Error fetching all tasks:", error);
        alert("Failed to fetch tasks. Please try again.");
    });
}

// Function to display tasks in a table
function displayTasksInTable(tasks) {
    const tableBody = document.getElementById('task-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    tasks.forEach(task => {
        const row = document.createElement('tr');

        const cellId = document.createElement('td');
        cellId.textContent = task.TaskID;
        row.appendChild(cellId);

        const cellName = document.createElement('td');
        cellName.textContent = task.TaskName;
        row.appendChild(cellName);

        const cellDescription = document.createElement('td');
        cellDescription.textContent = task.TaskDescription;
        row.appendChild(cellDescription);

        const cellStatus = document.createElement('td');
        cellStatus.textContent = task.TaskStatus;
        row.appendChild(cellStatus);

        tableBody.appendChild(row);
    });
}

// Function to clear the TaskID input field
function clearTaskIDInput() {
    const taskIDInput = document.getElementById('task-id');
    taskIDInput.value = ''; 
}
