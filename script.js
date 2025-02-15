// Drag and Drop
var drake = dragula([document.getElementById('to-do'), document.getElementById('doing'), document.getElementById('done'), document.getElementById('trash')]);
drake.on('drop', function (el, target, source, sibling) {
    if (target.id === 'trash') {
        el.querySelector('.delete-button').style.display = 'block'; 
    } else {
        el.querySelector('.delete-button').style.display = 'none'; 
    }
    saveTasks();
});

// Add Task
function addTask(columnId, inputId) {
    var inputTask = document.getElementById(inputId).value;
    if (inputTask.trim() !== "") {
        var newTask = document.createElement('li');
        newTask.className = 'task';
        newTask.innerHTML = `<div class='d-flex justify-content-center align-items-center'><p class='fs-4' onclick="editTask(this)">${inputTask}</p><button class="btn btn-danger delete-button" onclick="deleteTask(this)">Delete</button></div>`;
        document.getElementById(columnId).appendChild(newTask);
        document.getElementById(inputId).value = ""; 
        saveTasks();
    }
}

// Delete Task
function deleteTask(button) {
    var taskItem = button.parentElement.parentElement; 
    taskItem.parentElement.removeChild(taskItem); 
    saveTasks();
}

// Edit Task
function editTask(taskElement) {
    var newTaskText = prompt("Edit your task:", taskElement.innerText);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskElement.innerText = newTaskText;
        saveTasks();
    }
}

// Date and Time Display
function updateDateTime() {
    const now = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsDay = { weekday: 'long' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    document.getElementById('date').innerText = now.toLocaleString('en-US', optionsDate);
    document.getElementById('day').innerText = now.toLocaleString('en-US', optionsDay);
    document.getElementById('time').innerText = now.toLocaleString('en-US', optionsTime);
}
setInterval(updateDateTime, 1000); // Update every second
updateDateTime(); // Initial call to display immediately

// Sparkle Effect
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        createSparkle(e.clientX, e.clientY);
    });
});
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);
    sparkle.addEventListener('animationend', () => {
        sparkle.remove();
    });
}

// Save Tasks to Local Storage
function saveTasks() {
    const taskColumns = ['to-do', 'doing', 'done', 'trash'];
    let tasks = {};
    taskColumns.forEach(columnId => {
        const column = document.getElementById(columnId);
        const taskTexts = Array.from(column.children).map(task => task.innerText.trim());
        tasks[columnId] = taskTexts;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    for (const columnId in tasks) {
        const column = document.getElementById(columnId);
        tasks[columnId].forEach(taskText => {
            var newTask = document.createElement('li');
            newTask.className = 'task';
            newTask.innerHTML = `<div class='d-flex justify-content-center align-items-center'><p class='fs-4' onclick="editTask(this)">${taskText}</p><button class="btn btn-danger delete-button" onclick="deleteTask(this)">Delete</button></div>`;
            column.appendChild(newTask);
        });
    }
}

// Initialize
loadTasks();
