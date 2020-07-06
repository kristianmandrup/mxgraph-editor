import { BaseDialog } from "./BaseDialog";

export class OpenFileDialog extends BaseDialog {
  ui: any;
  dialogFactory: any;
  $openFile: any;

  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
  }

  get useLocalStorage() {
    return false;
    // return Editor.useLocalStorage
  }

  get width() {
    return this.useLocalStorage ? 640 : 320;
  }

  get height() {
    return this.useLocalStorage ? 480 : 220;
  }

  hideDialog(_fn) {}

  createOpenFileDialog() {
    return this.dialogFactory.createOpenFile((cancel) => {
      this.hideDialog(cancel);
    });
  }

  createOpenDialog() {
    return this.dialogFactory.createOpenDialog();
  }

  get container() {
    return this.createOpenDialog().container;
  }

  /**
   * Adds the label menu items to the given menu and parent.
   */
  openFile() {
    // Closes dialog after open
    this.$openFile = this.createOpenFileDialog();

    const { container, width, height, modal, closable } = this;
    const fn = () => {
      this.$openFile = null;
    };
    // Removes openFile if dialog is closed
    this.showDialog({
      container,
      width,
      height,
      modal,
      closable,
      fn,
    });
  }
}
