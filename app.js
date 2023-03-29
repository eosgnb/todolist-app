function landing() {
    const message = ["Hello there!"];
    const speed = 100;
    let textPosition = 0;

    // Typewriter effect for greeting
    function typewriter() {
        document.querySelector(".heading").innerHTML = message[0].substring(0, textPosition);
        if(textPosition++ != message[0].length) {
            setTimeout(typewriter, speed);
        } 
    } typewriter();

    const userForm = document.getElementById('userForm');
    const nickname = document.getElementById('nameField');
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nicknameText = nickname.value.trim();
        const regExp = /[\p{P}\p{S}]/u;

        if (!nicknameText || !isNaN(nicknameText) || regExp.test(nicknameText)) {
            alert('Please enter a valid nickname!');
        } else {
            location.href = './todo.html';
            localStorage.setItem('username', nicknameText);
            userForm.reset();
        }
    });
}

function createList() {
    // Display To-Do list header with user's name
    const todoUser = document.getElementById('todoUser');    
    todoUser.innerHTML = `Hi, ${localStorage.getItem('username')}! Here's your To-Do List.`;
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskField');
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTodo(taskText);
            taskForm.reset();
        } 
    });

    const taskList = document.getElementById('taskList');
    function addTodo(task) {
        const newTask = document.createElement('li');
        
        const checkBox = document.createElement('input');
        newTask.classList.add('list-group-item');
        checkBox.type = 'checkbox';
        checkBox.classList.add('checkbox', 'me-2');
        checkBox.addEventListener("change", toggleTodo);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('float-end', 'me-2');
        deleteBtn.innerText = '\u2715';
        deleteBtn.addEventListener('click', deleteTodo);
        
        newTask.appendChild(checkBox);
        newTask.append(task);
        newTask.append(deleteBtn);
        taskList.append(newTask);
    }

    function toggleTodo() {
        if (this.checked) {
            this.parentElement.style.textDecoration = 'line-through';
        } else {
            // taskField.classList.remove("checked");
            this.parentElement.style.textDecoration = 'none'
        }
    }

    function deleteTodo() {
        this.parentElement.remove();
    }
}

function getDateToday() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    
    // Create new date object
    const date = new Date();

    let dayName = dayNames[date.getDay()];
    let monthName = monthNames[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    document.getElementById('currentDate').innerHTML = `${dayName} • ${monthName} ${day}, ${year}`;
}

function getCurrentTime() {
    // Create new date object
    const time = new Date();
    let mins = time.getMinutes();
    let secs = time.getSeconds();
    let hour = time.getHours();

    document.getElementById('currentTime').innerHTML = `${hour}:${checkTime(mins)}:${checkTime(secs)}`;
    setTimeout(getCurrentTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


