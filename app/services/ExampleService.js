import { AppState } from "../AppState.js";
import { Example } from "../models/Example.js";

class ExamplesService {
  addMessage(message) {
    const example = new Example(message)
    AppState.examples.push(example)
  }
}

export const examplesService = new ExamplesService()