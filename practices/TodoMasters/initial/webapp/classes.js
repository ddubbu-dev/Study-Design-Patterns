/**
 * 확장자 필수
 * other builder (babel, typescript) 에서 자동처리되던게 vanilla js 에서는 미처리됨
 * */

import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(other) { // Value Object pattern
    return this.text === other.text;
  }
}

export class TodoList {
  // Data
  #data = new Set();
  get items() { return this.#data }

  // Singleton
  // static keyword : class property (not instance property)
  // 예시: const todoList = TodoList.getInstance();
  static instance = null;
  static {
    this.instance = new TodoList();
  }
  static getInstance() { return this.instance };
  constructor() {
    if (TodoList.instance) {
      throw new Error('Use TodoList.getInstance() to access the list')
    }
  }

  // List behavior
  add(item) {
    const array = Array.from(this.#data)
    const todoExists = array.some(target => target.equals(item))
    if (!todoExists) {
      this.#data.add(item)
      this.notify()
    }
  }

  delete(text) {
    const array = Array.from(this.#data)
    const todoToDelete = array.filter(target => target.text === text)[0]
    this.#data.delete(todoToDelete)
    this.notify()
  }

  find(text) {
    const array = Array.from(this.#data)
    return array.some(target => target.text === text)
  }

  replaceList(list) {
    this.#data = list
    this.notify()
  }
}

// Applying the observer mixin to the class
Object.assign(TodoList.prototype, observerMixin)