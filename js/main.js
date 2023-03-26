
import { elements } from "./UI.js";


let list = []
let countID = 0

function pushNewTask(nameTask, priority) {
  list.push({ task: nameTask, status: 'To Do', priority: priority, id: countID++ })
}

function addNewTask(event) {
  event.preventDefault()
  const checkTaskHigh = list.find(task => task.task === elements.INPUTHIGH.value)
  const checkTaskLow = list.find(task => task.task === elements.INPUTLOW.value)
  if (event.target.id === "buttonHigh") {
    if (elements.INPUTHIGH.value === '') {
      alert('NO!')
    } else {
      if (checkTaskHigh) {
        console.log('Такая задача уже имеется. Если вы не обнаружили ее среди важных задач, проверьте менее важные')
        elements.INPUTHIGH.value = ''
      } else {
        pushNewTask(elements.INPUTHIGH.value, 'High')
        elements.INPUTHIGH.value = ''
      }
    }
  } else if (event.target.id === "buttonLow") {
    if (elements.INPUTLOW.value === '') {
      alert('NO!')
    } else {
      if (checkTaskLow) {
        console.log('Такая задача уже имеется. Если вы не обнаружили ее среди важных задач, проверьте более важные')
        elements.INPUTLOW.value = ''
      } else {
        pushNewTask(elements.INPUTLOW.value, 'Low')
        elements.INPUTLOW.value = ''
      }
    }
  }
  render()
}

elements.BUTTONS.forEach(btn => {
  btn.addEventListener('click', addNewTask)
});

function render() {
  elements.UIHIGH.textContent = ''
  elements.UILOW.textContent = ''

  list.forEach(task => {
    const buttonDelTask = document.createElement('button')
    buttonDelTask.textContent = '×'
    buttonDelTask.className = 'button-delete_task'
    buttonDelTask.setAttribute('id', `${task.id}`)

    const changeTaskStatus = document.createElement('input')
    changeTaskStatus.className = 'checkbox'
    changeTaskStatus.type = 'checkbox'
    changeTaskStatus.setAttribute('status', `${task.status}`)

    if (task.priority === 'High') {
      const taskHigh = document.createElement('li')
      taskHigh.textContent = task.task
      taskHigh.className = 'new-task'
      elements.UIHIGH.append(taskHigh)
      taskHigh.append(buttonDelTask)
      taskHigh.append(changeTaskStatus)
    }
    else if (task.priority === 'Low') {
      const taskLow = document.createElement('li')
      taskLow.textContent = task.task
      taskLow.className = 'new-task'
      elements.UILOW.append(taskLow)
      taskLow.append(buttonDelTask)
      taskLow.append(changeTaskStatus)
    }

  })
  const BTNDELTASK = document.querySelectorAll('.button-delete_task')
  BTNDELTASK.forEach(btn => btn.addEventListener('click', deleteTask))


  const changeStatus = document.querySelectorAll('.checkbox')
  changeStatus.forEach(btn => btn.addEventListener('click', changeStatusTask))
}


function deleteTask(event) {
  const findId = event.target.id
  list = list.filter(element => element.id != findId)
  render()
}


function changeStatusTask(event) {
  let changeStatus = event.target
  console.log(changeStatus.status);

}



























