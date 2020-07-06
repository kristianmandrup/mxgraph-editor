import { BaseDialog } from "./BaseDialog";
import mx from "@mxgraph-app/mx";
const { mxImage, mxUtils, mxResources } = mx;

export class BackgroundImageDialog extends BaseDialog {
  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
  }

  createChangePageSetup(_image): any {
    return {};
    // return new ChangePageSetup(this, null, image);
  }

  /**
   * Hides the current menu.
   */
  showBackgroundImageDialog(apply) {
    const { graph } = this;
    apply =
      apply != null
        ? apply
        : (image) => {
            var change = this.createChangePageSetup(image);
            change.ignoreColor = true;

            graph.model.execute(change);
          };

    var newValue = mxUtils.prompt(mxResources.get("backgroundImage"), "");

    if (newValue != null && newValue.length > 0) {
      var img = new Image();

      img.onload = function () {
        apply(new mxImage(newValue, img.width, img.height));
      };
      img.onerror = function () {
        apply(null);
        mxUtils.alert(mxResources.get("fileNotFound"));
      };

      img.src = newValue;
    } else {
      apply(null);
    }
  }
}
