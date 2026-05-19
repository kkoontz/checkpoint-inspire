import { AppState } from '../AppState.js'
import { Todo } from '../models/Todo.js'
import { api } from '../utils/Axios.js'
import { Pop } from '../utils/Pop.js'

class TodosService {
  async loadTodos() {
    try {
      const res = await api.get('api/todos')
      const list = Array.isArray(res.data) ? res.data : []
      AppState.todos = list.map(t => new Todo(t))
    } catch (error) {
      console.error('[TodosService]', error)
      Pop.error(error, 'Could not load todos')
      AppState.todos = []
    }
  }

  async createTodo(description) {
    try {
      const res = await api.post('api/todos', { description })
      const todo = new Todo(res.data)
      AppState.todos = [...AppState.todos, todo]
      return todo
    } catch (error) {
      console.error('[TodosService]', error)
      Pop.error(error, 'Could not add todo')
    }
  }

  async toggleTodo(todo) {
    try {
      const res = await api.put(`api/todos/${todo.id}`, {
        completed: !todo.completed
      })
      const updated = new Todo(res.data)
      AppState.todos = AppState.todos.map(t =>
        t.id === updated.id ? updated : t
      )
    } catch (error) {
      console.error('[TodosService]', error)
      Pop.error(error, 'Could not update todo')
    }
  }

  async deleteTodo(todo) {
    try {
      await api.delete(`api/todos/${todo.id}`)
      AppState.todos = AppState.todos.filter(t => t.id !== todo.id)
    } catch (error) {
      console.error('[TodosService]', error)
      Pop.error(error, 'Could not delete todo')
    }
  }
}

export const todosService = new TodosService()
