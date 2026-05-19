export class Account {
  constructor(data = {}) {
    this.id = data.id || data._id
    this.name = data.name || ''
    this.email = data.email || ''
    this.picture = data.picture || ''
  }
}
