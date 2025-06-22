document.addEventListener("DOMContentLoaded",()=> {
    const storedTask=JSON.parse(localStorage.getItem('tasks'))

    if(storedTask){
        storedTask,forEach((tasks)=>tasks.push(task))
        updateTasklist();
        updateStats();
    }
})

let tasks = [];

const savetask =()=>
{
    localStorage.setItem('task',JSON.stringify(task))
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newtask').addEventListener('click', function (e) {
        e.preventDefault();
        addTask();
    });

    updateTasklist();
    updateStats();
});

const addTask = () => {
    const inputTask = document.getElementById('inputtask');
    const text = inputTask.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        inputTask.value = "";
        updateTasklist();
        updateStats();
        savetask();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasklist();
    updateStats();
            savetask();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasklist();
    updateStats();
            savetask();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        const trimmed = newText.trim();
        if (trimmed !== '') {
            tasks[index].text = trimmed;
            updateTasklist();
            updateStats();
                    savetask();
        }
    }
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;
    // progressBar.innerText = `${Math.round(progress)}% Complete`; // ❌ remove or comment this line

    document.getElementById('number').innerText =`${completedTasks}/${totalTasks}`;
};

const updateTasklist = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="img2.png" onclick="editTask(${index})" alt="Edit"/>
                    <img src="img.png" onclick="deleteTask(${index})" alt="Delete"/>
                </div>
            </div>
        `;

        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};
