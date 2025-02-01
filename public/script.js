document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('todo').style.display = 'block';
        loadTasks();
    }
});

async function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
    }
}

async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Log the data to make sure it's correct
    console.log('Username:', username);
    console.log('Password:', password);

    // If either field is empty, show an alert
    if (!username || !password) {
        alert('⚠️ Please fill in both username and password!');
        return;
    }

    try {
        const response = await fetch('https://todoo-jh2e.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            document.getElementById('auth').style.display = 'none';
            document.getElementById('todo').style.display = 'block';
            loadTasks();
        } else {
            alert('❌ Invalid login details.');
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('❌ Login failed. Please try again.');
    }
}

async function loadTasks() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const tasks = await response.json();
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach(task => {
                const template = document.getElementById('taskTemplate');
                const taskItem = template.content.cloneNode(true);
                const taskTitle = taskItem.querySelector('.task-title');
                const taskDescription = taskItem.querySelector('.task-description');
                const deleteButton = taskItem.querySelector('button:nth-of-type(1)');
                const editButton = taskItem.querySelector('button:nth-of-type(2)');
                const doneButton = taskItem.querySelector('button:nth-of-type(3)');

                taskTitle.textContent = task.title;
                taskDescription.textContent = task.description;

                if (task.done) {
                    taskItem.classList.add('done');
                    doneButton.classList.add('done-button');
                }

                deleteButton.setAttribute('onclick', `deleteTask('${task._id}')`);
                editButton.setAttribute('onclick', `editTask('${task._id}', '${task.title}', '${task.description}')`);
                doneButton.setAttribute('onclick', `toggleDone('${task._id}', this, this.closest('.task-item'))`);

                taskList.appendChild(taskItem);
            });
        }
    } catch (err) {
        console.log('Error fetching tasks', err);
    }
}

async function addTask() {
    const token = localStorage.getItem('token');
    const title = document.getElementById('taskInput').value.trim();
    const description = document.getElementById('descInput').value.trim();

    if (!title || !description) return;

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            loadTasks();
            document.getElementById('taskInput').value = '';
            document.getElementById('descInput').value = '';
        }
    } catch (err) {
        console.log('Error adding task', err);
    }
}

async function deleteTask(taskId) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
            loadTasks();
        }
    } catch (err) {
        console.log('Error deleting task', err);
    }
}

async function editTask(taskId, currentTitle, currentDescription) {
    const token = localStorage.getItem('token');
    if (!token) return;

    const modal = document.getElementById('editModal');
    const titleInput = document.getElementById('editTaskTitle');
    const descInput = document.getElementById('editTaskDesc');
    const saveButton = document.getElementById('saveChangesBtn');

    titleInput.value = currentTitle;
    descInput.value = currentDescription;

    modal.style.display = 'block';

    saveButton.onclick = async () => {
        const newTitle = titleInput.value.trim();
        const newDescription = descInput.value.trim();

        if (newTitle && newDescription) {
            try {
                const response = await fetch(`/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title: newTitle, description: newDescription }),
                });

                if (response.ok) {
                    loadTasks();
                    modal.style.display = 'none';
                }
            } catch (err) {
                console.log('Error updating task', err);
            }
        }
    };
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

async function toggleDone(taskId, button, taskElement) {
    taskElement.classList.toggle('done');

    button.classList.toggle('done-button');
}

function logout() {
    localStorage.removeItem('token');
    document.getElementById('auth').style.display = 'block';
    document.getElementById('todo').style.display = 'none';
}
