import { AppState } from '../AppState.js'
import { quotesService } from '../services/QuotesService.js'

export class QuoteController {
  constructor() {
    AppState.on('quote', () => this.draw())
    quotesService.loadQuote()
  }

  draw() {
    const quote = AppState.quote
    const el = document.getElementById('quote-widget')
    if (!el || !quote) return

    el.innerHTML = /* html */`
      <p class="quote-text">${quote.content}</p>
      <p class="quote-author">— ${quote.author}</p>
    `
  }
}
