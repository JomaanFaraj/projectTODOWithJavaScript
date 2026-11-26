let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.getElementById("delAll");

let arrayOfTasks = [];

// Check If Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage
getDataFromLocalStorage();


tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();  
  }

    // Toggle Task Status
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done"); 
  }
}
);

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
   
  }
};

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };


    // Push Task To Array
    arrayOfTasks.push(task);
    // Add Tasks To Page
      deleteAll.style.display='block';

    addElementsToPageFrom();
    addDataToLocalStorageFrom();
}
function addElementsToPageFrom()
{
    tasksDiv.innerHTML="";
    arrayOfTasks.forEach((task)=>{
        //create div 
        let div =document.createElement("div");
        div.className="task";

        if (task.completed)
        {
            div.className="task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        //create button
        let deleteButton  = document.createElement("span");
        deleteButton .className="del";
        deleteButton.appendChild(document.createTextNode("Delete"));
         div.appendChild(deleteButton );


         //add div task to tasksDiv main
         tasksDiv.appendChild(div);

    }

    );
}
function addDataToLocalStorageFrom() {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  //let data = window.localStorage.getItem("tasks");

  //if (data) 
  if(arrayOfTasks.length > 0){
    deleteAll.style.display='block';
    addElementsToPageFrom();
  }
  else 
  {
    tasksDiv.innerHTML="soory... Not found any think (:";
    deleteAll.style.display='none';
  }
  
}
function deleteTaskWith(taskid)
{
  arrayOfTasks=arrayOfTasks.filter((task)=> task.id !=taskid );
  addDataToLocalStorageFrom();
}

function toggleStatusTaskWith(taskid)
{
//   arrayOfTasks=arrayOfTasks.map((task) =>{
//         if (task.id == taskid)
//         {
//           task.completed ? false : true ;
//         }
//   }
   
// );
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
  tasksDiv.innerHTML="";
  localStorage.clear();
  arrayOfTasks.splice(0);
  getDataFromLocalStorage();
}