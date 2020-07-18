import { BaseDialog } from "./BaseDialog";

export class EditDataDialog extends BaseDialog {
  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
  }

  width = 480;
  height = 420;

  modal = false;

  /**
   * Hides the current menu.
   */
  showDataDialog(cell) {
    if (cell != null) {
      var dlg = this.dialogFactory.createEditDataDialog(this, { cell });
      const { container } = dlg;
      const { width, height, modal, closable } = this;
      this.showDialog({ container, width, height, modal, closable });
      dlg.init();
    }
  }
}
