import { DndSpellsController } from "./Controllers/DndSpellsController.js";
import { SandboxSpellsController } from "./Controllers/SandboxSpellsController.js";

class App {
  dndSpellsController = new DndSpellsController()
  sandboxSpellsController = new SandboxSpellsController()
}

window["app"] = new App();
