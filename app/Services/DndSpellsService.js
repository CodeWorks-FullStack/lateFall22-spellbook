import { appState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";

const dndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/spells/'
})
class DndSpellsService {
  async getOneSpell(index) {
    const res = await dndApi.get(index)
    console.log('[GET ONE SPELL]', res.data);
    // NOTE don't map single objects. Not cause it's bad, cause it wont work
    appState.activeSpell = new Spell(res.data)
    // console.log('new Spell', appState.activeSpell)
  }
  async getDndSpells() {
    const res = await dndApi.get()
    console.log('[DND GET SPELLS]', res.data);
    // NOTE these didnt get mapped cause they didn't have the info of the spell
    appState.dndSpells = res.data.results
  }

}

export const dndSpellsService = new DndSpellsService()