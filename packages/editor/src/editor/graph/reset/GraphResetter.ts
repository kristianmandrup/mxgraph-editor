import { EditorGraph } from "../EditorGraph";
import { Editor } from "../../Editor";
import mx from "@mxgraph-app/mx";
const { mxGraph } = mx;

export class GraphResetter {
  eg: EditorGraph;
  editor: Editor;

  constructor(eg: EditorGraph) {
    this.eg = eg;
    this.editor = eg.editor;
  }

  get graph() {
    return this.editor.graph;
  }

  /**
   * resets graph
   */
  reset() {
    const { urlParams, graph, isChromelessView } = this.editor;
    const { updateGraphComponents } = this.eg;
    const { resetPage } = this;

    graph.gridEnabled = !isChromelessView() || urlParams["grid"] == "1";
    graph.graphHandler.guidesEnabled = true;
    graph.setTooltips(true);
    graph.setConnectable(true);
    graph.foldingEnabled = true;
    graph.scrollbars = graph.defaultScrollbars;

    resetPage();

    graph.background = null;

    graph.currentScale = 1;
    graph.currentTranslate.x = 0;
    graph.currentTranslate.y = 0;
    updateGraphComponents();
    graph.view.setScale(1);
  }

  resetPage() {
    const { graph } = this;
    graph.pageVisible = graph.defaultPageVisible;
    graph.pageBreaksVisible = graph.pageVisible;
    graph.preferPageSize = graph.pageBreaksVisible;
    graph.pageScale = mxGraph.prototype.pageScale;
    graph.pageFormat = mxGraph.prototype.pageFormat;
  }
}
