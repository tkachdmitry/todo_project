// 'use strict'
document.addEventListener("DOMContentLoaded", function(event) {

    const todoField = document.querySelector('.todo__field');
    const todoAdd = document.querySelector('.todo__add');
    const todoList = document.querySelector('.todo__list');

    const limitTaskLength = (value) => {
    // limit for task length
        if (value.length > 30) {
            value = `${value.substring(0,28)}-
                        ${value.substring(28, 50)}...`;
            console.log(value);
            return value;
        } else {
            return value;
        }
    }

    const createToDoTask = (value) => {
        // create todoTask
        const todoTask = document.createElement('div');
        todoTask.classList.add("todo__task");
        const taskDiv = document.createElement('div');
        //create taskDiv in todoTask
        taskDiv.classList.add('todo__titlediv');
        todoTask.appendChild(taskDiv);
        // create todoTaskTitle in taskDiv
        const todoTaskTitle = document.createElement('div');
        todoTaskTitle.classList.add("todo__title");
        todoTaskTitle.textContent = limitTaskLength(value);
        taskDiv.appendChild(todoTaskTitle);
        // create checkbox in todoTask
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add("todo__checkbox");
        todoTask.appendChild(checkbox);
        // create deleteBtn in todoTask
        const deleteBtn = document.createElement('div');
        deleteBtn.textContent = 'Del';
        deleteBtn.classList.add("todo__delete");
        todoTask.appendChild(deleteBtn);
        //create pomBtn in todoTask
        const pomBtn = document.createElement('div');
        pomBtn.textContent = 'Need Pomodoro';
        pomBtn.classList.add("todo__pombutton");
        todoTask.appendChild(pomBtn);

        const expandPomodoro = (event) => {
            event.preventDefault();
            pomBtn.classList.add('hide');

            console.log('expand pomodoro');
            const taskNode = event.target.parentNode;
            taskNode.classList.remove('todo__task');
            taskNode.classList.add('todo__task-pomodoro');

            // function create pomodoro nodes
            const createAndAppend = (parent, {text = '', classname = ''}) => {
                const element = document.createElement('div');
                element.textContent = text;
                if (classname.length) {
                    element.classList.add(classname);
                }
                if (text.length) {
                    element.textContent = text;
                }
                    parent.appendChild(element);
                    console.log(element);
                return element;
            }

            const todoTimer = createAndAppend(taskNode, {classname: 'todo__timer'});
            const min = createAndAppend(todoTimer, {text: '25', classname: 'todo__minutes'});
            const twoDots = createAndAppend(todoTimer, {text: ':'});
            const sec = createAndAppend(todoTimer, {text: '00', classname: 'todo_seconds'});
            const todoBtns = createAndAppend(taskNode, {classname: 'todo__btns'});
            const startBtn = createAndAppend(todoBtns, {text: 'START', classname: 'todo__start'});
            const stopBtn = createAndAppend(todoBtns, {text: 'STOP', classname: 'todo__stop'});
            const counterParent = createAndAppend(taskNode, {classname: 'todo__counterparent'});
            const textInCounter = createAndAppend(counterParent, {text: 'Number of Pomodoros: '});
            let counter = '0';
            const counterDiv = createAndAppend(counterParent, {text: counter, classname: "todo__counter"})
            console.log(counterDiv);

            // POMODORO

            let deadLine = 3;
            let myInterval = -1;

            //add zero if min or second in less then 10
            const plusZero = (number) => {
                if (number <= 9) {
                    return '0' + number;
                } else {
                    return number;
                }
            }

            // function reset interval if time out
            const resetInterval = () => {
                if (deadLine < 0) {
                    min.textContent = "25";
                    sec.textContent = "00";
                    stopPomodoro();
                }
            }
            //function counter
            const startCounter = () => {
                if (deadLine === 0) {
                    counter++;
                    counterDiv.textContent = counter;
                    console.log(counter);
                }
            }

            // function start pomodoro timer
            const startPomodoro = (event) => {
                event.preventDefault();
                console.log('start pomodoro');

                if (myInterval === -1) {
                    // change text inside button
                    startBtn.textContent = "PAUSE";
                        myInterval = setInterval(function () {
                        deadLine--;
                        const deadLineInWork = deadLine;
                        const minWork = Math.floor(deadLineInWork / 60);
                        const secWork = Math.floor(deadLineInWork % 60);

                        min.textContent = plusZero(minWork);
                        sec.innerHTML = plusZero(secWork);

                        startCounter();
                        resetInterval();
                    }, 1000);
                } else {
                    startBtn.textContent = "PAUSE";
                    clearInterval(myInterval);
                    myInterval = -1;

                    const deadLineInWork = deadLine;
                    const minWork = Math.floor(deadLineInWork / 60);
                    const secWork = Math.floor(deadLineInWork % 60);

                    min.textContent = plusZero(minWork);
                    sec.innerHTML = plusZero(secWork);
                    resetInterval();
                }
            }

            const stopPomodoro = (event) => {
                startBtn.innerHTML = 'START';
                clearInterval(myInterval);
                myInterval = -1;
                deadLine = 3;
                min.textContent = '25';
                sec.innerHTML = '00';
                resetInterval();
            }
            startBtn.addEventListener('click', startPomodoro);
            stopBtn.addEventListener('click', stopPomodoro);
        }

        // engage checkbox function completeTask
        checkbox.addEventListener('click', completeTask);
        // engage deleteBtn function deleteTask
        deleteBtn.addEventListener('click', deleteTask);
        //engage pomBtn function expandPomodoro
        pomBtn.addEventListener('click', expandPomodoro);
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
        console.log('delete')
    }

    todoAdd.addEventListener('click', addToDoTask);
});