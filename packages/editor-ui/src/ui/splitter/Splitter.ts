import { SplitHandler } from "./SplitHandler";

export class Splitter {
  ui: any;
  footerHeight: any;
  hsplitClickEnabled: any;
  destroyFunctions: any;

  constructor(ui) {
    this.ui = ui;
    this.footerHeight = ui.footerHeight;
    this.hsplitClickEnabled = ui.hsplitClickEnabled;
    this.destroyFunctions = ui.destroyFunctions;
  }

  /**
   * Updates the states of the given undo/redo items.
   */
  addSplitHandler(elem, horizontal, dx, onChange) {
    new SplitHandler({ elem, horizontal, dx, onChange }).addHandlers();
  }
}
