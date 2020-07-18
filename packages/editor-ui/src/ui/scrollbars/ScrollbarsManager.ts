import mx from "@mxgraph-app/mx";
import { WithScrollbars, NoScrollbars } from "./container";
const { mxUtils, mxEventObject } = mx;

export class ScrollbarsManager {
  ui: any;
  editor: any;
  actions: any;

  withScrollbars: WithScrollbars;
  noScrollbars: NoScrollbars;

  constructor(ui) {
    this.ui = ui;
    this.editor = ui.editor;
    this.withScrollbars = new WithScrollbars(ui);
    this.noScrollbars = new NoScrollbars(ui);
  }

  fireEvent(evt) {
    return this.editor.fireEvent(evt);
  }

  get graph() {
    return this.editor.graph;
  }

  /**
   * Specifies if the graph has scrollbars.
   */
  setScrollbars(value) {
    var graph = this.editor.graph;
    var prev = graph.container.style.overflow;
    graph.scrollbars = value;
    this.editor.updateGraphComponents();

    if (prev != graph.container.style.overflow) {
      graph.container.scrollTop = 0;
      graph.container.scrollLeft = 0;
      graph.view.scaleAndTranslate(1, 0, 0);
      this.resetScrollbars();
    }

    this.fireEvent(new mxEventObject("scrollbarsChanged"));
  }

  /**
   * Returns true if the graph has scrollbars.
   */
  hasScrollbars() {
    return this.editor.graph.scrollbars;
  }

  /**
   * Resets the state of the scrollbars.
   */
  resetScrollbars() {
    const { notExtendCanvas, notChromeless } = this;
    notExtendCanvas() || notChromeless();
  }

  notChromeless() {
    const { editor } = this;
    if (editor.isChromelessView()) return;
    return this.containerHasScrollbars() || this.containerNoScrollbars();
  }

  containerHasScrollbars() {
    return this.withScrollbars.apply();
  }

  containerNoScrollbars() {
    return this.noScrollbars.apply();
  }

  notExtendCanvas() {
    const { graph, editor } = this;
    if (editor.extendCanvas) return false;
    graph.container.scrollTop = 0;
    graph.container.scrollLeft = 0;

    if (!mxUtils.hasScrollbars(graph.container)) {
      graph.view.setTranslate(0, 0);
    }
    return true;
  }
}
