import { TodoList } from "./classes.js"

export const TodoHistory = {
  history: [],
  push(state) {
    if (state) {
      this.history.push(new Set([...state]))
    }
  },
  pop() {
    if (this.history.length > 1) {
      this.history.pop() // current
      return this.history.pop() // prev
    }
  }
}

const todoList = TodoList.getInstance()
todoList.addObserver(() => {
  TodoHistory.push(todoList.items)
})