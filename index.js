let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.getElementById("delAll");
let searchInput = document.querySelector(".search");
let descriptionInput = document.querySelector(".description");
let arrayOfTasks = [];

// Check If Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage
getDataFromLocalStorage();


tasksDiv.addEventListener("click", (e) => {

    // Delete Task
    if (e.target.classList.contains("del")) {

        if(confirm("Do you want to delete this task?")) {

            deleteTaskWith(
                e.target.parentElement.getAttribute("data-id")
            );

            e.target.parentElement.remove();

            isShowdeleteAll();

        }

        return;
    }

    // Toggle Task Status
    let taskElement = e.target.closest(".task");

    if(taskElement) {

        toggleStatusTaskWith(
            taskElement.getAttribute("data-id")
        );

        taskElement.classList.toggle("done");

    }

});

// Add Task
submit.onclick = function () {
  if (input.value.trim() !== "") {

    addTaskToArray(input.value, descriptionInput.value);

    input.value = "";
    descriptionInput.value = "";
    searchInput.value = "";

  }
};

function addTaskToArray(taskText, taskDescription) {

    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        description: taskDescription,
        completed: false,
    };

    // Push Task To Array
    arrayOfTasks.push(task);

    // Add Tasks To Page
    addElementsToPageFrom();

    isShowdeleteAll();

    addDataToLocalStorageFrom();
}
function addElementsToPageFrom()
{
    tasksDiv.innerHTML = "";

    arrayOfTasks.forEach((task) => {

        // Create Main Task Div
        let div = document.createElement("div");
        div.className = "task";

        if (task.completed)
        {
            div.className = "task done";
        }

        div.setAttribute("data-id", task.id);

        // Create Task Content
        let contentDiv = document.createElement("div");
        contentDiv.className = "task-content";

        // Create Task Title
        let title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        contentDiv.appendChild(title);

        // Create Task Description
        if (task.description && task.description.trim() !== "")
        {
            let description = document.createElement("p");
            description.className = "task-description";
            description.textContent = task.description;

            contentDiv.appendChild(description);
        }

        div.appendChild(contentDiv);

        // Create Delete Button
        let deleteButton = document.createElement("span");
        deleteButton.className = "del";
        deleteButton.textContent = "Delete";

        div.appendChild(deleteButton);

        // Add Task To Tasks Div
        tasksDiv.appendChild(div);

    });

}
function addDataToLocalStorageFrom() {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  //let data = window.localStorage.getItem("tasks");

  //if (data) 
  if(arrayOfTasks.length > 0){
    
    addElementsToPageFrom();
  }
   
  
    isShowdeleteAll();
   
  
  
}
function deleteTaskWith(taskid)
{
  arrayOfTasks=arrayOfTasks.filter((task)=> task.id !=taskid );
  addDataToLocalStorageFrom();
}

function toggleStatusTaskWith(taskid)
{   

for(let i=0; i<arrayOfTasks.length ; i++)
{
  if(arrayOfTasks[i].id == taskid)
  {
    arrayOfTasks[i].completed = arrayOfTasks[i].completed ? false : true ;
  }
}
  addDataToLocalStorageFrom();
}
deleteAll.onclick=function()
{
  if(confirm("Do you want to delete all files?"))
  {
  localStorage.clear();
  arrayOfTasks.splice(0);
  isShowdeleteAll();
  }
  


}
function isShowdeleteAll()
{
  if(arrayOfTasks.length > 0)
  {
    deleteAll.style.display = 'block';
    searchInput.style.display = 'block';
  }
  else
  {
    tasksDiv.innerHTML = "No tasks found. Add a new task to get started!";
    deleteAll.style.display = 'none';
    searchInput.style.display = 'none';
  }
}
// Search Tasks
searchInput.addEventListener("input", function () {

    let searchValue = searchInput.value.toLowerCase();

    let tasks = document.querySelectorAll(".tasks .task");

    tasks.forEach((task) => {

        let taskTitle = task.firstChild.textContent.toLowerCase();

        if (taskTitle.includes(searchValue)) {
            task.style.display = "flex";
        }
        else {
            task.style.display = "none";
        }

    });

});