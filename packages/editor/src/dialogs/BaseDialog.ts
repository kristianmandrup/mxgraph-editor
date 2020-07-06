import { DialogsFactory } from "./DialogsFactory";

export class BaseDialog {
  ui: any;
  graph: any;
  dialogFactory: any;

  constructor(ui, dialogFactory) {
    this.ui = ui;
    this.graph = ui.graph;
    this.dialogFactory = dialogFactory || this.createDialogFactory();
  }

  createDialogFactory() {
    return new DialogsFactory(this.ui);
  }

  showDialog(_opts: any = {}) {
    return {};
  }
}
