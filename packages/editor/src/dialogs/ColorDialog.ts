import { BaseDialog } from "./BaseDialog";
import { DialogsFactory } from "./DialogsFactory";

export class ColorDialog extends BaseDialog {
  ui: any;
  graph: any;
  dialogFactory: any;

  constructor(ui, dialogFactory?: any) {
    super(ui, dialogFactory);
    this.graph = ui.graph;
    this.dialogFactory = dialogFactory || this.createDialogFactory();
  }

  get selState() {
    return this.graph.cellEditor.saveSelection();
  }

  get presetColors() {
    // ColorDialog.prototype.presetColors
    return [];
  }

  get defaultColors() {
    // ColorDialog.prototype.presetColors
    return [];
  }

  get colorDialogHeight() {
    return (
      226 +
      (Math.ceil(this.presetColors.length / 12) +
        Math.ceil(this.defaultColors.length / 12)) *
        17
    );
  }

  get colorDialogSize() {
    return {
      width: this.colorDialogWidth,
      height: this.colorDialogHeight,
    };
  }

  get colorDialogWidth() {
    return 230;
  }

  createColorDialog(opts: any = {}) {
    let { color, apply } = opts;
    const { width, height } = this.colorDialogSize;
    const { graph, selState } = this;
    const applyColor = (color) => {
      const { selState } = this;
      graph.cellEditor.restoreSelection(selState);
      apply(color);
    };
    const restoreSelection = () => {
      graph.cellEditor.restoreSelection(selState);
    };

    color = color || "none";
    var dlg = this.dialogFactory.createColorDialog({
      width,
      height,
      color,
      applyColor,
      restoreSelection,
    });
    return dlg;
  }

  /**
   * Display a color dialog.
   */
  pickColor(color, apply) {
    const { width, height } = this.colorDialogSize;
    var dlg = this.createColorDialog({ color, apply });
    const container = dlg.container;
    const modal = true;
    const closable = false;
    this.showDialog({ container, width, height, modal, closable });
    dlg.init();
  }
}
