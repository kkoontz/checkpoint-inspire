import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { api } from '../utils/Axios.js'
import { Pop } from '../utils/Pop.js'

class AccountService {
  async loadAccount() {
    try {
      const res = await api.get('account')
      AppState.account = new Account(res.data)
    } catch (error) {
      console.error('[AccountService]', error)
    }
  }
}

export const accountService = new AccountService()
