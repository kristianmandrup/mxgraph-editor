import mx from "@mxgraph-app/mx";
const { mxEventObject } = mx;

export class PageConfig {
  ui: any;
  editor: any;
  actions: any;

  constructor(ui) {
    this.ui = ui;
    this.editor = ui.editor;
    this.actions = ui.actions;
  }

  get graph() {
    return this.editor.graph;
  }

  fireEvent(_evt) {}

  /**
   * Loads the stylesheet for this graph.
   */
  setPageFormat(value) {
    const { graph, actions } = this;
    graph.pageFormat = value;
    if (!graph.pageVisible) {
      actions.get("pageView").funct();
    } else {
      graph.view.validateBackground();
      graph.sizeDidChange();
    }
    this.fireEvent(new mxEventObject("pageFormatChanged"));
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setPageScale(value) {
    const { graph, fireEvent, actions } = this;
    graph.pageScale = value;

    if (!graph.pageVisible) {
      actions.get("pageView").funct();
    } else {
      graph.view.validateBackground();
      graph.sizeDidChange();
    }
    fireEvent(new mxEventObject("pageScaleChanged"));
  }
}
