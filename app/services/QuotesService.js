import { AppState } from '../AppState.js'
import { Quote } from '../models/Quote.js'
import { api } from '../utils/Axios.js'
import { Pop } from '../utils/Pop.js'

class QuotesService {
  async loadQuote() {
    try {
      const res = await api.get('api/quotes')
      AppState.quote = new Quote(res.data)
    } catch (error) {
      console.error('[QuotesService]', error)
      Pop.error(error, 'Could not load quote')
    }
  }
}

export const quotesService = new QuotesService()
