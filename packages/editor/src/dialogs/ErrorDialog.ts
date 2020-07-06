import { BaseDialog } from "./BaseDialog";

export class ErrorDialog extends BaseDialog {
  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
  }

  linesFor(msg) {
    return Math.ceil(msg != null ? msg.length / 50 : 1);
  }

  displayErrorDialog(opts) {
    let { msg, width, height, onClose } = opts;
    var dlg = this.dialogFactory.createErrorDialog(opts);
    //   this, title, msg, $btn, {
    //   fn,
    //   retry,
    //   btn2,
    //   fn2,
    //   hide,
    //   btn3,
    //   fn3,
    // });
    const lineCount = this.linesFor(msg);
    const { container } = dlg;
    const linesHeight = lineCount * 20;
    width = width || 340;
    height = height || 100 + linesHeight;
    // true, false
    this.showDialog({ container, width, height, onClose });
    dlg.init();
  }
}
