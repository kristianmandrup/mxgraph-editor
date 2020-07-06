import { DialogsFactory } from "./DialogsFactory";

export class BaseDialog {
  ui: any;
  dialogFactory: any;

  constructor(ui, dialogFactory) {
    this.ui = ui;
    this.dialogFactory = dialogFactory || this.createDialogFactory();
  }

  modal = true;
  closable = true;

  get graph() {
    return this.ui.graph;
  }

  createDialogFactory() {
    return new DialogsFactory(this.ui);
  }

  showDialog(_opts: any = {}) {
    return {};
  }
}
