import { appState } from "../AppState.js"
import { Spell } from "../Models/Spell.js"

const sandBoxApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/liam/spells'
})


class SandboxSpellsService {
  async prepareSpell(id) {
    let selectedSpell = appState.mySpells.find(s => s.id == id)
    console.log('[Preparing]', selectedSpell);
    // NOTE flip the bool
    // if (selectedSpell.prepared == false) {
    //   selectedSpell.prepared = true
    // } else {
    //   selectedSpell.prepared = false
    // }
    // NOTE flip it a little faster
    selectedSpell.prepared = !selectedSpell.prepared
    const res = await sandBoxApi.put(id, selectedSpell)
    appState.emit('mySpells')
  }
  async removeSpellFromBook() {
    const spell = appState.activeSpell
    const res = await sandBoxApi.delete(spell.id)
    console.log('[DELETED SPELL]', res.data);
    appState.mySpells = appState.mySpells.filter(s => s.id != spell.id)
    appState.activeSpell = null
  }
  async addToSpellBook() {
    let spell = appState.activeSpell
    // NOTE the '' in post just means don't append more to the url
    const res = await sandBoxApi.post('', spell)
    console.log('[ADD SPELL]', res.data);
    appState.mySpells = [...appState.mySpells, new Spell(res.data)]
  }
  async getSpells() {
    const res = await sandBoxApi.get()
    console.log('[Sandbox spells GET]', res.data)
    // NOTE map only happens on arrays
    appState.mySpells = res.data.map(s => new Spell(s))
  }

  setOneSpell(id) {
    let spell = appState.mySpells.find(s => s.id == id)
    appState.activeSpell = spell
  }

}

export const sandboxSpellsService = new SandboxSpellsService()