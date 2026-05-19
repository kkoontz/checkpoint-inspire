import { AppState } from '../AppState.js'
import { Image } from '../models/Image.js'
import { api } from '../utils/Axios.js'
import { Pop } from '../utils/Pop.js'
import { preferencesService } from './PreferencesService.js'

class ImagesService {
  async loadImage() {
    try {
      const params = {}
      if (preferencesService.collection) {
        params.collection = preferencesService.collection
      }
      const res = await api.get('api/images', { params })
      AppState.image = new Image(res.data)
    } catch (error) {
      console.error('[ImagesService]', error)
      Pop.error(error, 'Could not load background image')
    }
  }
}

export const imagesService = new ImagesService()
