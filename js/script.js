'use strict'
document.addEventListener("DOMContentLoaded", function(event) {
    const todoField = document.querySelector('.todo__field');
    const todoAdd = document.querySelector('.todo__add');
    const todoList = document.querySelector('.todo__list');

    const limitTaskLength = (value) => {
        // limit for task length
        if (value.length > 97) {
            value = value.substring(0, 97);
            return `${value}...`;
        } else {
            return value;
        }
    }

    const createToDoTask = (value) => {
        // create todoTask
        const todoTask = document.createElement('div');
        todoTask.classList.add("todo__task");
        todoTask.textContent = limitTaskLength(value);
        // create checkbox in todoTask
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add("todo__checkbox");
        todoTask.appendChild(checkbox)
        // create deleteBtn in todoTask
        const deleteBtn = document.createElement('div');
        deleteBtn.textContent = 'Del';
        deleteBtn.classList.add("todo__delete");
        todoTask.appendChild(deleteBtn);

        // engage checkbox function completeTask
        checkbox.addEventListener('click', completeTask);
        // engage deleteBtn function deleteTask
        deleteBtn.addEventListener('click', deleteTask);

        return todoTask;
    }

    const addToDoTask = (event) => {
        event.preventDefault();
        //checks value of todoField and if true create new task item in todoList
        if (todoField.value) {
            const newToDoTask = createToDoTask(todoField.value);
            todoField.value = '';
            return todoList.appendChild(newToDoTask);
        }
    }

    const completeTask = (event) => {
        const clickedCheckbox = event.target;
        const checkboxParent = clickedCheckbox.parentElement;

        if (clickedCheckbox.checked) {
            checkboxParent.classList.remove('unsuccess');
            checkboxParent.classList.add('success');
            checkboxParent.classList.add('lastinorder');
        } else {
            checkboxParent.classList.remove('success');
            checkboxParent.classList.add('unsuccess');
        }
    }

    const deleteTask = (event) => {
        event.preventDefault();
        event.target.parentNode.remove();
    }

    todoAdd.addEventListener('click', addToDoTask);
});