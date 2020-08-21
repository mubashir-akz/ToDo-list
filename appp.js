const form = document.querySelector('#task-form');
const task = document.querySelector('#task-name');
const ul = document.querySelector('.collection');
const clear = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
form.addEventListener('submit', addList);
function addList(e) {
    if (task.value !== '') {

        const li = document.createElement('li');
        const link = document.createElement('a');
        li.className = 'collection-item';
        li.innerText = task.value;
        link.className = 'delete-item secondary-content delete';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        link.id = 'delete-li';
        li.appendChild(link);
        ul.appendChild(li);
    }

    storeTaskInLs(task.value);
    task.value = '';

    e.preventDefault();
}

function storeTaskInLs(tas) {
    let taskss;
    if (localStorage.getItem('tasks') === null) {
        taskss = [];
    } else {
        taskss = JSON.parse(localStorage.getItem('tasks'));
    }

    taskss.push(tas);

    localStorage.setItem('tasks', JSON.stringify(taskss));
}


ul.addEventListener('click', remove);

function remove(e) {
    console.log(e.target.parentElement.parentElement.textContent);

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure to delete ' + e.target.parentElement.parentElement.textContent + '?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}




clear.addEventListener('click', cleared);

function cleared() {
    const list = document.querySelectorAll('li');
    ul.innerHTML = '';
}
filter.addEventListener('keyup', filtered);

function filtered(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            console.log(item.toLowerCase().indexOf(text));
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}
document.addEventListener('DOMContentLoaded', getTasks);

//get tasks from ls
function getTasks() {
    let taskss;
    if (localStorage.getItem('tasks') === null) {
        taskss = [];
    } else {
        taskss = JSON.parse(localStorage.getItem('tasks'));
    }

    taskss.forEach(function (tasks) {

        const li = document.createElement('li');
        const link = document.createElement('a');
        li.className = 'collection-item';
        li.innerText = tasks;
        link.className = 'delete-item secondary-content delete';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        link.id = 'delete-li';
        li.appendChild(link);
        ul.appendChild(li);
    });
}