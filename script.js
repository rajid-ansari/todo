const inputField = document.querySelector('.taskInput');
const createTaskBtn = document.querySelector('.create-task-btn');
const taskBox = document.querySelector('.tasks');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskData => {
        createTaskElement(taskData.text, taskData.completed);
    });
});

function createTaskElement(text, completed = false) {
    let task = document.createElement('div');
    task.classList.add('task');

    task.innerHTML = `<h2>${text}</h2>
    <div><span id='complete'>${completed ? 'Completed' : '✔️'}</span> <span id='delete'>🗑️</span></div>
    `;

    if(completed) {
        task.style.backgroundColor = 'green';
    }

    taskBox.append(task);

    // Displaying completion of task
    const complete = task.querySelector('#complete');
    complete.addEventListener('click', () => {
        task.style.backgroundColor = 'green';
        complete.innerHTML = 'Completed';
        updateLocalStorage();
    });

    // Delete functionality
    const removeTask = task.querySelector('#delete');
    removeTask.addEventListener('click', () => {
        taskBox.removeChild(task);
        updateLocalStorage();
    });
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(taskElement => {
        tasks.push({
            text: taskElement.querySelector('h2').textContent,
            completed: taskElement.querySelector('#complete').textContent === 'Completed'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// task creation
createTaskBtn.addEventListener('click', () => {
    if (inputField.value.trim()) {
        createTaskElement(inputField.value);
        updateLocalStorage();
        inputField.value = '';
    }
});
