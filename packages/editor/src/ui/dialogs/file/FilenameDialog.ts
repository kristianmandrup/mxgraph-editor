import { BaseDialog } from "../BaseDialog";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class FilenameDialog extends BaseDialog {
  ui: any;
  graph: any;
  dialogFactory: any;
  $openFile: any;
  editor: any;

  width = 300;
  height = 100;

  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
  }

  get fileName() {
    return this.editor.getOrCreateFilename();
  }

  get title() {
    return mxResources.get("save");
  }

  save(_name) {}

  onOk = (name) => {
    this.save(name);
  };

  onCancel = (name) => {
    if (name != null && name.length > 0) {
      return true;
    }

    mxUtils.confirm(mxResources.get("invalidName"));

    return false;
  };

  modal = true;
  closable = true;

  get dlg() {
    return this.dialogFactory.createFilenameDialog();
  }

  get container() {
    return this.dlg.container;
  }

  displayDialog() {
    const {
      // ui,
      dlg,
      container,
      fileName,
      title,
      width,
      height,
      modal,
      closable,
    } = this;
    this.showDialog({
      container,
      fileName,
      title,
      width,
      height,
      modal,
      closable,
    });
    dlg.init();
  }
}
