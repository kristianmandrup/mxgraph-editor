import mx from "@mxgraph-app/mx";
const { mxEventObject, mxUtils } = mx;

export class DialogManager {
  ui: any;
  dialogs: any;
  dialog: any;
  editor: any;

  constructor(ui) {
    this.ui = ui;
  }

  /**
   */
  hideDialog(cancel, isEsc?) {
    if (this.dialogs != null && this.dialogs.length > 0) {
      var dlg = this.dialogs.pop();

      if (dlg.close(cancel, isEsc) == false) {
        //add the dialog back if dialog closing is cancelled
        this.dialogs.push(dlg);
        return;
      }

      this.dialog =
        this.dialogs.length > 0 ? this.dialogs[this.dialogs.length - 1] : null;
      this.editor.fireEvent(new mxEventObject("hideDialog"));

      if (
        this.dialog == null &&
        this.editor.graph.container.style.visibility != "hidden"
      ) {
        window.setTimeout(() => {
          if (
            this.editor.graph.isEditing() &&
            this.editor.graph.cellEditor.textarea != null
          ) {
            this.editor.graph.cellEditor.textarea.focus();
          } else {
            mxUtils.clearSelection();
            this.editor.graph.container.focus();
          }
        }, 0);
      }
    }
  }
}
