export class Todo {
  constructor(data = {}) {
    this.id = data.id || data._id
    this.completed = data.completed ?? false
    this.description = data.description || ''
    this.creatorId = data.creatorId
  }
}
