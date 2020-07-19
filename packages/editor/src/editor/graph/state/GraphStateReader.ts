import { Editor } from "../../Editor";
import mx from "@mxgraph-app/mx";
const { mxRectangle, mxGraph } = mx;

export class GraphStateReader {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  /**
   * Sets the XML node for the current diagram.
   */
  readGraphState(node) {
    const { urlParams, graph, isChromelessView } = this.editor;
    graph.gridEnabled =
      node.getAttribute("grid") != "0" &&
      (!isChromelessView() || urlParams["grid"] == "1");
    graph.gridSize =
      parseFloat(node.getAttribute("gridSize")) || mxGraph.prototype.gridSize;
    graph.graphHandler.guidesEnabled = node.getAttribute("guides") != "0";
    graph.setTooltips(node.getAttribute("tooltips") != "0");
    graph.setConnectable(node.getAttribute("connect") != "0");
    graph.connectionArrowsEnabled = node.getAttribute("arrows") != "0";
    graph.foldingEnabled = node.getAttribute("fold") != "0";

    if (isChromelessView() && graph.foldingEnabled) {
      graph.foldingEnabled = urlParams["nav"] == "1";
      graph.cellRenderer.forceControlClickHandler = graph.foldingEnabled;
    }

    var ps = parseFloat(node.getAttribute("pageScale"));

    if (!isNaN(ps) && ps > 0) {
      graph.pageScale = ps;
    } else {
      graph.pageScale = mxGraph.prototype.pageScale;
    }

    if (!graph.isLightboxView() && !graph.isViewer()) {
      var pv = node.getAttribute("page");

      if (pv != null) {
        graph.pageVisible = pv != "0";
      } else {
        graph.pageVisible = graph.defaultPageVisible;
      }
    } else {
      graph.pageVisible = false;
    }

    graph.pageBreaksVisible = graph.pageVisible;
    graph.preferPageSize = graph.pageBreaksVisible;

    var pw = parseFloat(node.getAttribute("pageWidth"));
    var ph = parseFloat(node.getAttribute("pageHeight"));

    if (!isNaN(pw) && !isNaN(ph)) {
      graph.pageFormat = new mxRectangle(0, 0, pw, ph);
    }

    // Loads the persistent state settings
    var bg = node.getAttribute("background");

    if (bg != null && bg.length > 0) {
      graph.background = bg;
    } else {
      graph.background = null;
    }
  }
}
