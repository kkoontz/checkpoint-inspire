import { AppState } from '../AppState.js'
import { imagesService } from '../services/ImagesService.js'

export class ImageController {
  constructor() {
    AppState.on('image', () => this.draw())
    imagesService.loadImage()
  }

  draw() {
    const image = AppState.image
    const layer = document.getElementById('bg-layer')
    const credit = document.getElementById('image-attribution')
    if (!layer || !image) return

    layer.style.backgroundImage = `url('${image.url}')`
    if (credit) {
      credit.textContent = image.author ? `Image by ${image.author}` : ''
    }
  }
}
