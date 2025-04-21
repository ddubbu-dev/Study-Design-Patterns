import { TodoList } from "./webapp/classes.js";
import { Command, CommandExecutor, Commands } from "./webapp/command.js";
import { LocalStorage } from "./webapp/storage.js";

globalThis.DOM = {} // globalThis=window in browser
const DOM = globalThis.DOM;

function renderList() {
  DOM.todoList.innerHTML = '' // reset

  const list = TodoList.getInstance().items;
  for (let todo of list) {
    const $listItem = document.createElement('li')
    $listItem.classList.add('todo-item')
    $listItem.innerHTML = `${todo.text} <button class='delete-btn'>Delete</button>`
    $listItem.dataset.text = todo.text
    DOM.todoList.appendChild($listItem)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  DOM.todoList = document.getElementById('todo-list')
  DOM.addBtn = document.getElementById('add-btn')
  DOM.todoInput = document.getElementById('todo-input')

  DOM.addBtn.addEventListener('click', e => {
    const cmd = new Command(Commands.ADD)
    CommandExecutor.execute(cmd)
  })

  DOM.todoList.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      const text = e.target.parentNode.dataset.text;
      const cmd = new Command(Commands.DELETE, [text])
      CommandExecutor.execute(cmd)
    }
  })

  TodoList.getInstance().addObserver(renderList)
})

document.addEventListener('DOMContentLoaded', () => {
  LocalStorage.load()
})