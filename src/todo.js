const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList"),
toDoFinish = document.querySelector(".js-toDoFinish");

const TODOS_LS = "PENDING";
const FIN_LS = "FINISHED";

let PENDING = [];
let FINISHED = [];


function deleteToDo(event) {
    const li = event.path[1];
    toDoList.removeChild(li);
    const cleanToDos = PENDING.filter((toDo) => toDo.id !== parseInt(li.id));
    PENDING = cleanToDos;
    saveToDos(TODOS_LS, PENDING);
}  

function deleteFinished(event) {
    const li = event.path[1];
    toDoFinish.removeChild(li);
    const cleanFinished = FINISHED.filter((finish) => finish.id !== parseInt(li.id));
    FINISHED = cleanFinished;
    saveToDos(FIN_LS, FINISHED);
}

function saveToDos(ls, data) {
    localStorage.setItem(ls, JSON.stringify(data));
}

function getContent(event) {
    const li = event.path[1];
    const text = li.querySelector('span').innerText;
    return text;
}  

function handleFinished(event) {
    const content = getContent(event);
    deleteToDo(event);
    paintFinished(content);
}

function handleToDo(event) {
    const content = getContent(event);
    deleteFinished(event);
    paintToDo(content);
}

function paintFinished(text, id = null) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const moveBtn = document.createElement('button');
    const span = document.createElement('span');
    let newId = Date.now();
    if (id !== null) {
      newId = id;
    }
    delBtn.innerText = '❌';
    moveBtn.innerText = '⏪';
    delBtn.addEventListener('click', deleteFinished);
    moveBtn.addEventListener('click', handleToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(moveBtn);
    li.id = newId;
    toDoFinish.appendChild(li);
    const finishedObj = {
      text: text,
      id: newId,
    };
    FINISHED.push(finishedObj);
    saveToDos(FIN_LS, FINISHED);
}
  
function paintToDo(text, id = null){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const moveBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId = Date.now();
    if (id !== null) {
        newId = id;
      }
    span.innerText = text;
    delBtn.innerText = "❌";
    moveBtn.innerText = "✅";
    delBtn.addEventListener("click", deleteToDo);
    moveBtn.addEventListener("click", handleFinished);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(moveBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId    
    };
    PENDING.push(toDoObj);
    saveToDos(TODOS_LS, PENDING);
}

function handleSubmit(event) {
    event.preventDefault();
 //   if (!toDoInput.value) return; //
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    const loadFinished = localStorage.getItem(FIN_LS);
  
    if (loadToDos !== null) {
      const parsedToDos = JSON.parse(loadToDos);
      parsedToDos.forEach((toDo) => paintToDo(toDo.text, toDo.id));
    }
  
    if (loadFinished !== null) {
      const parsedToDos = JSON.parse(loadFinished);
      parsedToDos.forEach((toDo) => paintFinished(toDo.text, toDo.id));
    }
}  

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}
init();