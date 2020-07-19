import mx from "@mxgraph-app/mx";
import { ErrorDialog } from "../dialogs/ErrorDialog";
const { mxUtils, mxResources } = mx;

export class ErrorManager {
  editorUi: any;
  opts: any;
  errorDialog: ErrorDialog;

  constructor(editorUi, opts) {
    this.editorUi = editorUi;
    this.opts = opts;
    this.errorDialog = new ErrorDialog(this);
  }

  /**
   * Translates this point by the given vector.
   *
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  handleError() {
    const { normalError, customError } = this;
    normalError() || customError();
  }

  normalError() {
    let { resp, title, fn, invokeFnOnClose } = this.opts;
    const error = resp && resp.error ? resp.error : resp;

    if (!(error || title)) return;
    var msg = mxUtils.htmlEntities(mxResources.get("unknownError"));
    var btn = mxResources.get("ok");
    title = title ? title : mxResources.get("error");

    if (error && error.message != null) {
      msg = mxUtils.htmlEntities(error.message);
    }

    invokeFnOnClose = invokeFnOnClose ? fn : null;
    const opts = { title, msg, btn, fn, invokeFnOnClose };

    this.showError(opts);
    return true;
  }

  customError() {
    const { fn } = this.opts;
    if (!fn) return;
    fn();
    return true;
  }

  /**
   * Translates this point by the given vector.
   *
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  showError(opts: any = {}) {
    this.errorDialog.displayErrorDialog(opts);
  }
}
