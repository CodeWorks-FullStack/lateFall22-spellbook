

export class Spell {
  constructor(data) {
    this.id = data.id || ''
    this.name = data.name
    this.description = data.description || data.desc.join('\n') // FIXME we know there will be a problem later
    this.damage = data.damage ? data.damage.damage_type ? data.damage.damage_type.name : data.damage : ''
    this.level = data.level
    this.range = data.range
    this.material = data.material || ''
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.castingTime || data.casting_time // FIXME we know there will be a problem later
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared
  }



  get ActiveTemplate() {
    return `
    <h3 class="col-12 text-center text-primary">${this.name}</h3>
    <p class="col-10 spell-description scrollable-y">
    ${this.description}
    </p>
    <div class="col-6">
      ${this.components}
    </div>
    <div class="col-6">
      ${this.material}
    </div>
    <div class="col-4">${this.damage}</div>
    <div class="col-4">${this.range}</div>
    <div class="col-4">${this.level}</div>
    <div class="col-4">${this.castingTime}</div>
    <div class="col-4">${this.duration}</div>
    <div class="col-4">${this.ritual}</div>
    <div class="col-4">${this.concentration}</div>
    ${this.ComputeButtons}
    `
  }

  get MySpellTemplate() {
    return `
    <div class="col-2 bg-dark">
      <input type="checkbox" ${this.prepared ? 'checked' : ''} onchange="app.sandboxSpellsController.prepareSpell('${this.id}')"/>
    </div>
    <div class="col-10 selectable p-1 text-end bg-dark text-light" onclick = "app.sandboxSpellsController.setOneSpell('${this.id}')" > ${this.name}</div>
      `
  }

  get ComputeButtons() {
    if (this.id) {
      return `<button class="btn btn-danger" onclick="app.sandboxSpellsController.removeSpellFromBook()">remove</button>`
    } else {
      return `<button class="btn btn-primary" onclick="app.sandboxSpellsController.addToSpellBook()">add</button>`
    }
  }



  static ListTemplate(spell) {
    return `<div class="col-12 selectable p-1" onclick = "app.dndSpellsController.getOneSpell('${spell.index}')" > ${spell.name}</div> `
  }

  static PlaceholderTemplate() {
    return `<h3 class="text-center">Please select a spell from either list </h3>`
  }
}