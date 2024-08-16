

// div  and delete function-> ul -> append ul create li -> delete li and change color




let liId = 0;




document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText) {
        liId++;
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.id = `${liId}`; 
        li.innerHTML = `${taskText} <button onclick="deleteTask('${li.id}')">Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = '';
    }
});

// Delete li function
function deleteTask(id) {
    const li = document.getElementById(id); 
    if (li) {
        li.style.textDecoration = 'line-through'; 
        li.style.backgroundColor = 'green'; 
    }
}
