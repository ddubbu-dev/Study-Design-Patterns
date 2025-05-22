// MIXIN that will implement Observer Pattern
// Observe : After add or remove list items, Notify.

export const observerMixin = {
  observers: new Set(),
  addObserver(obs) { this.observers.add(obs) },
  removeObserver(obs) { this.observers.delete(obs) },
  notify() { this.observers.forEach(obs => obs()) }
}

