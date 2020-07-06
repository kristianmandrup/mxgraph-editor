import { BaseDialog } from "./BaseDialog";

export class LinkDialog extends BaseDialog {
  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
  }

  width = 420;
  height = 90;

  showLinkDialog(value, btnLabel, fn) {
    var dlg = this.dialogFactory.createLinkDialog(this, {
      value,
      btnLabel,
      fn,
    });
    const { container } = dlg;
    const { width, height, closable, modal } = this;
    this.showDialog({ container, width, height, closable, modal });
    dlg.init();
  }
}
