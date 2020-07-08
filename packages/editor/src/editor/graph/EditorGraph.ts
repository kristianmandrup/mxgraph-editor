import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
const {
  mxResources,
  mxEventObject,
  mxUtils,
  mxCodec,
  mxRectangle,
  mxGraph,
} = mx;

interface IGraph {
  transparentBackground?: boolean;
  isBlankLink?: any;
}

export class EditorGraph {
  editor: Editor;

  /**
   * Default value for the graph container overflow style.
   */
  defaultGraphOverflow: string = "hidden";

  constructor(editor: Editor) {
    this.editor = editor;
  }

  createGraphInstance(_model, _themes): IGraph {
    return {}; // new Graph(null, model, null, null, themes);
  }

  /**
   * Sets the XML node for the current diagram.
   */
  createGraph(themes, model) {
    const { chromeless, isExternalProtocol } = this.editor;
    const graph = this.createGraphInstance(model, themes);
    graph.transparentBackground = false;

    // Opens all links in a new window while editing
    if (!chromeless) {
      graph.isBlankLink = function (href) {
        return !isExternalProtocol(href);
      };
    }
    return graph;
  }

  /**
   * Sets the XML node for the current diagram.
   */
  resetGraph() {
    const { urlParams, graph, isChromelessView } = this.editor;
    const { updateGraphComponents } = this;

    graph.gridEnabled = !isChromelessView() || urlParams["grid"] == "1";
    graph.graphHandler.guidesEnabled = true;
    graph.setTooltips(true);
    graph.setConnectable(true);
    graph.foldingEnabled = true;
    graph.scrollbars = graph.defaultScrollbars;
    graph.pageVisible = graph.defaultPageVisible;
    graph.pageBreaksVisible = graph.pageVisible;
    graph.preferPageSize = graph.pageBreaksVisible;
    graph.background = null;
    graph.pageScale = mxGraph.prototype.pageScale;
    graph.pageFormat = mxGraph.prototype.pageFormat;
    graph.currentScale = 1;
    graph.currentTranslate.x = 0;
    graph.currentTranslate.y = 0;
    updateGraphComponents();
    graph.view.setScale(1);
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

  /**
   * Sets the XML node for the current diagram.
   */
  setGraphXml(node) {
    const { graph, fireEvent } = this.editor;
    if (node != null) {
      var dec = new mxCodec(node.ownerDocument);

      if (node.nodeName == "mxGraphModel") {
        graph.model.beginUpdate();

        try {
          graph.model.clear();
          graph.view.scale = 1;
          this.readGraphState(node);
          this.updateGraphComponents();
          dec.decode(node, graph.getModel());
        } finally {
          graph.model.endUpdate();
        }

        fireEvent(new mxEventObject("resetGraphView"));
      } else if (node.nodeName == "root") {
        this.resetGraph();

        // Workaround for invalid XML output in Firefox 20 due to bug in mxUtils.getXml
        var wrapper = dec.document.createElement("mxGraphModel");
        wrapper.appendChild(node);

        dec.decode(wrapper, graph.getModel());
        this.updateGraphComponents();
        fireEvent(new mxEventObject("resetGraphView"));
      } else {
        throw {
          message: mxResources.get("cannotOpenFile"),
          node: node,
          toString: function () {
            return this.message;
          },
        };
      }
    } else {
      this.resetGraph();
      graph.model.clear();
      this.fireEvent("resetGraphView");
    }
  }

  /**
   * Returns the XML node that represents the current diagram.
   */
  getGraphXml(ignoreSelection) {
    const { graph } = this.editor;
    ignoreSelection = ignoreSelection != null ? ignoreSelection : true;
    var node: any = null;

    if (ignoreSelection) {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      node = enc.encode(graph.getModel());
    } else {
      node = graph.encodeCells(
        mxUtils.sortCells(
          graph.model.getTopmostCells(graph.getSelectionCells())
        )
      );
    }

    if (graph.view.translate.x != 0 || graph.view.translate.y != 0) {
      node.setAttribute("dx", Math.round(graph.view.translate.x * 100) / 100);
      node.setAttribute("dy", Math.round(graph.view.translate.y * 100) / 100);
    }

    node.setAttribute("grid", graph.isGridEnabled() ? "1" : "0");
    node.setAttribute("gridSize", graph.gridSize);
    node.setAttribute("guides", graph.graphHandler.guidesEnabled ? "1" : "0");
    node.setAttribute("tooltips", graph.tooltipHandler.isEnabled() ? "1" : "0");
    node.setAttribute(
      "connect",
      graph.connectionHandler.isEnabled() ? "1" : "0"
    );
    node.setAttribute("arrows", graph.connectionArrowsEnabled ? "1" : "0");
    node.setAttribute("fold", graph.foldingEnabled ? "1" : "0");
    node.setAttribute("page", graph.pageVisible ? "1" : "0");
    node.setAttribute("pageScale", graph.pageScale);
    node.setAttribute("pageWidth", graph.pageFormat.width);
    node.setAttribute("pageHeight", graph.pageFormat.height);

    if (graph.background != null) {
      node.setAttribute("background", graph.background);
    }

    return node;
  }

  /**
   * Keeps the graph container in sync with the persistent graph state
   */
  updateGraphComponents() {
    const { fireEvent, graph } = this.editor;

    if (graph.container != null) {
      graph.view.validateBackground();
      graph.container.style.overflow = graph.scrollbars
        ? "auto"
        : this.defaultGraphOverflow;

      fireEvent(new mxEventObject("updateGraphComponents"));
    }
  }

  fireEvent(event) {
    this.editor.fireEvent(event);
  }
}
