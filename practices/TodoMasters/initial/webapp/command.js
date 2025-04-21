import { TodoItem, TodoList } from "./classes.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: 'add',
  DELETE: 'delete'
}

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    const DOM = globalThis.DOM

    switch (command.name) {
      case Commands.ADD:
        const todoInput = DOM.todoInput;
        const todoText = todoInput.value.trim();
        const itemToAdd = todoList.find(todoText);
        if (todoText !== "" && !Boolean(itemToAdd)) {
          todoInput.value = "";
          todoList.add(new TodoItem(todoText));
        }
        break;
      case Commands.DELETE:
        const [textToDelete] = command.args;
        todoList.delete(textToDelete)
        break;
    }
  }
}