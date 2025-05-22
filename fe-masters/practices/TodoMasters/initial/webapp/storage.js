import { TodoItem, TodoList } from "./classes.js";

const todoList = TodoList.getInstance()

export const LocalStorage = {
  load() {
    const raw = localStorage.getItem('todos')
    if (raw) {
      const array = JSON.parse(raw)
      for (let item of array) {
        todoList.add(new TodoItem(item.text))
      }
    }
  },
  save() {
    const array = Array.from(todoList.items)
    localStorage.setItem('todos', JSON.stringify(array))
  }
}

todoList.addObserver(LocalStorage.save)