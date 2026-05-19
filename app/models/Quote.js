export class Quote {
  constructor(data = {}) {
    this.content = data.quote || data.content || ''
    this.author = data.author || 'Unknown'
    this.source = data.source || ''
  }
}
