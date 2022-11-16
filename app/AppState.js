import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  // values = loadState('values', [Value])

  dndSpells = []

  /** @type {import('./Models/Spell.js').Spell | null} */
  activeSpell = null

  /** @type {import('./Models/Spell.js').Spell[]} */
  mySpells = []
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
