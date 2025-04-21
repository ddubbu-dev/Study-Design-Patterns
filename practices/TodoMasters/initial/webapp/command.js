import { TodoItem, TodoList } from "./classes.js";
import { TodoHistory } from "./memento.js";

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
  DELETE: 'delete',
  UNDO: 'undo'
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
      case Commands.UNDO:
        const previousList = TodoHistory.pop();
        if (previousList) {
          todoList.replaceList(previousList)
        }
    }
  }
}