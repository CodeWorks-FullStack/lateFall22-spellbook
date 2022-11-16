import { appState } from "../AppState.js";
import { sandboxSpellsService } from "../Services/SandboxSpellsService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";


function _drawMySpells() {
  // NOTE draw spell list
  let spells = appState.mySpells
  let template = ''
  spells.forEach(s => template += s.MySpellTemplate)
  setHTML('my-spells', template)
  // NOTE draw spell count
  let spellCount = appState.mySpells.filter(s => s.prepared == true).length
  if (spellCount <= 10) {
    setHTML('spell-count', `<div>${spellCount}/10</div>`)
  } else {
    setHTML('spell-count', `<div class="text-danger">⚠️${spellCount}/10</div>`)
  }
}


export class SandboxSpellsController {

  constructor() {
    appState.on('mySpells', _drawMySpells)
    this.getSpells()
  }


  async getSpells() {
    try {
      await sandboxSpellsService.getSpells()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  setOneSpell(id) {
    sandboxSpellsService.setOneSpell(id)
  }

  async addToSpellBook() {
    try {
      await sandboxSpellsService.addToSpellBook()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async prepareSpell(id) {
    try {
      await sandboxSpellsService.prepareSpell(id)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async removeSpellFromBook() {
    try {
      await sandboxSpellsService.removeSpellFromBook()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }
}