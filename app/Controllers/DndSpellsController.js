import { appState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";
import { dndSpellsService } from "../Services/DndSpellsService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawDndSpells() {
  let spells = appState.dndSpells
  let template = ''
  spells.forEach(s => template += Spell.ListTemplate(s))
  setHTML('api-spells', template)
}

function _drawActiveSpell() {
  let spell = appState.activeSpell
  // NOTE determines if there is an active spell to draw or not
  if (spell) {
    setHTML('active-spell', spell.ActiveTemplate)
  } else {
    setHTML('active-spell', Spell.PlaceholderTemplate())
  }
}

export class DndSpellsController {

  constructor() {
    appState.on('activeSpell', _drawActiveSpell)
    appState.on('dndSpells', _drawDndSpells)
    this.getDndSpells()
    _drawActiveSpell()
  }

  async getDndSpells() {
    try {
      await dndSpellsService.getDndSpells()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async getOneSpell(index) {
    try {
      await dndSpellsService.getOneSpell(index)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }
}