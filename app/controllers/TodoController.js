import { AppState } from '../AppState.js'
import { AuthService } from '../Auth/AuthService.js'
import { todosService } from '../services/TodosService.js'

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export class TodoController {
  #panelOpen = false

  constructor() {
    AppState.on('todos', () => {
      this.drawList()
      this.drawCount()
    })
    AppState.on('identity', () => this.#onAuthChange())

    document.getElementById('todo-toggle')?.addEventListener('click', () => this.#togglePanel())
    document.getElementById('todo-panel-close')?.addEventListener('click', () => this.#closePanel())
    document.getElementById('add-todo-form')?.addEventListener('submit', (e) => this.#onAdd(e))
    document.getElementById('todos-list')?.addEventListener('click', (e) => this.#onListClick(e))

    this.drawCount()
    this.#onAuthChange()
  }

  #onAuthChange() {
    const authed = AuthService.isAuthenticated
    const panel = document.getElementById('todo-panel')
    const hint = document.getElementById('todo-auth-hint')
    if (panel) panel.classList.toggle('todo-panel--locked', !authed)
    if (hint) hint.hidden = authed
    if (authed) {
      todosService.loadTodos()
    } else {
      AppState.todos = []
    }
  }

  #togglePanel() {
    this.#panelOpen = !this.#panelOpen
    document.getElementById('todo-panel')?.classList.toggle('is-open', this.#panelOpen)
  }

  #closePanel() {
    this.#panelOpen = false
    document.getElementById('todo-panel')?.classList.remove('is-open')
  }

  async #onAdd(event) {
    event.preventDefault()
    if (!AuthService.isAuthenticated) return

    const form = event.target
    const input = form.querySelector('input[name="description"]')
    const description = input?.value?.trim()
    if (!description) return

    await todosService.createTodo(description)
    form.reset()
  }

  async #onListClick(event) {
    const toggle = event.target.closest('[data-todo-toggle]')
    const remove = event.target.closest('[data-todo-delete]')
    const id = toggle?.dataset.todoToggle || remove?.dataset.todoDelete
    if (!id) return

    const todo = AppState.todos.find(t => t.id === id)
    if (!todo) return

    if (toggle) {
      await todosService.toggleTodo(todo)
      return
    }

    if (remove) {
      if (!confirm('Delete this todo?')) return
      await todosService.deleteTodo(todo)
    }
  }

  drawCount() {
    const el = document.getElementById('todo-toggle')
    if (!el) return
    const remaining = AppState.todos.filter(t => !t.completed).length
    const label = remaining === 1 ? 'Todo' : 'Todos'
    el.textContent = `${remaining} ${label} remaining`
  }

  drawList() {
    const list = document.getElementById('todos-list')
    if (!list) return

    if (!AppState.todos.length) {
      list.innerHTML = '<p class="todo-empty">No todos yet.</p>'
      return
    }

    list.innerHTML = AppState.todos.map(todo => /* html */`
      <li class="todo-item ${todo.completed ? 'is-done' : ''}">
        <label class="todo-check">
          <input
            type="checkbox"
            data-todo-toggle="${todo.id}"
            ${todo.completed ? 'checked' : ''}
            aria-label="Mark complete"
          >
          <span class="todo-label">${escapeHtml(todo.description)}</span>
        </label>
        <button
          type="button"
          class="todo-delete"
          data-todo-delete="${todo.id}"
          aria-label="Delete todo"
        >
          <i class="mdi mdi-delete-outline"></i>
        </button>
      </li>
    `).join('')
  }
}
