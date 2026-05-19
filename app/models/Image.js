export class Image {
  constructor(data = {}) {
    this.id = data.id
    this.url = data.imgUrls?.full || data.imgUrls?.regular || data.url || ''
    this.author = data.attribution || data.author || 'Unknown'
    this.description = data.description || ''
    this.collection = data.collection || ''
  }
}
