import { BaseDialog } from "./BaseDialog";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources } = mx;

export class ImageDialog extends BaseDialog {
  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
  }

  /**
   * Hides the current menu.
   */
  showImageDialog(title, value, fn, _ignoreExisting) {
    const { graph } = this;
    var cellEditor = graph.cellEditor;
    var selState = cellEditor.saveSelection();
    var newValue = mxUtils.prompt(title, value);
    cellEditor.restoreSelection(selState);

    if (newValue != null && newValue.length > 0) {
      var img = new Image();

      img.onload = function () {
        fn(newValue, img.width, img.height);
      };
      img.onerror = function () {
        fn(null);
        mxUtils.alert(mxResources.get("fileNotFound"));
      };

      img.src = newValue;
    } else {
      fn(null);
    }
  }
}
