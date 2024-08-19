

// // div  and delete function-> ul -> append ul create li -> delete li and change color




let liId = 0;

// document.getElementById('addTaskBtn').addEventListener('click', function() {
//     const taskInput = document.getElementById('taskInput');
//     const taskText = taskInput.value;

//     if (taskText) {
//         liId++;
//         const taskList = document.getElementById('taskList');
//         const li = document.createElement('li');
//         li.id = `${liId}`; 
//         li.innerHTML = `
//                     <span class="task-text">${taskText}</span>
//                     <button class="edit-btn" id='${li.id}' onclick="editTask('${li.id}')">Edit</button>
//                     <button class="delete-btn" onclick="deleteTask('${li.id}')">Delete</button>
//                     <input type="checkbox" onclick="toggleTaskStatus('${li.id}')">
//                 `;
   
//         taskList.appendChild(li);
//         taskInput.value = '';
//     }
// });

// // Delete li function
// function deleteTask(id) {
//     const li = document.getElementById(id); 
//     if (li) {
//         li.style.textDecoration = 'line-through'; 
//         li.style.backgroundColor = 'green'; 
//     }
// }

// function editTask(id) {
//     const li = document.getElementById(id);
//     const taskText = li.querySelector('.task-text');
//     const editBtn = li.querySelector('.edit-btn'); 
//     const isEditing = taskText.isContentEditable;
//     // console.log(isEditing);

//     if (isEditing) {
      
//         editBtn.textContent="Edit";
//         // Finish editing
//         taskText.contentEditable = "false";
        
//     } else {
        
      
//         editBtn.textContent="Save";
//       // Start editing
//         taskText.contentEditable = "true";
//         taskText.focus();
       
//     }
// }

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const task = {
            id: li.id,
            text: li.querySelector('.task-text').textContent,
            completed: li.querySelector('input[type="checkbox"]').checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(tasks);
    tasks.forEach(task => {
        liId = Math.max(liId, parseInt(task.id));
        const li = document.createElement('li');
        li.id = task.id;
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="edit-btn" id='${li.id}' onclick="editTask('${li.id}')">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${li.id}')">Delete</button>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskStatus('${li.id}')">
        `;
        taskList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText) {
        liId++;
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.id = `${liId}`; 
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="edit-btn" id='${li.id}' onclick="editTask('${li.id}')">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${li.id}')">Delete</button>
            <input type="checkbox" onclick="toggleTaskStatus('${li.id}')">
        `;
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();  // Save tasks after adding a new one
    }
});

function deleteTask(id) {
    const li = document.getElementById(id); 
    if (li) {
      li.remove();
        saveTasks();  // Save tasks after deleting a task
    }
}

function editTask(id) {
    const li = document.getElementById(id);
    const taskText = li.querySelector('.task-text');
    const editBtn = li.querySelector('.edit-btn'); 
    const isEditing = taskText.isContentEditable;

    if (isEditing) {
        editBtn.textContent = "Edit";
        taskText.contentEditable = "false";
        saveTasks();  // Save tasks after editing
    } else {
        editBtn.textContent = "Save";
        taskText.contentEditable = "true";
        taskText.focus();
    }
}

function toggleTaskStatus(id) {
    saveTasks();  // Save tasks after toggling status
}


function filterTasks(filter) {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByTagName('li');
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const isCompleted = task.querySelector('input[type="checkbox"]').checked;

        switch (filter) {
            case 'completed':
                task.style.display = isCompleted ? '' : 'none';
                break;
            case 'incomplete':
                task.style.display = !isCompleted ? '' : 'none';
                break;
            default:
                task.style.display = '';
        }
    }
}
