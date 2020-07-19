import { Editor } from "../../Editor";
import mx from "@mxgraph-app/mx";
import { PageConfig } from "./PageConfig";
const { mxGraph } = mx;

export class GraphStateReader {
  editor: Editor;
  node: any;

  pageConfig: PageConfig;

  constructor(editor: Editor) {
    this.editor = editor;
    this.pageConfig = this.createPageConfig();
  }

  createPageConfig() {
    return new PageConfig(this);
  }

  get graph() {
    return this.editor.graph;
  }

  configureGrid() {
    const { urlParams, graph, isChromelessView } = this.editor;
    const { node } = this;

    graph.gridEnabled =
      node.getAttribute("grid") != "0" &&
      (!isChromelessView() || urlParams["grid"] == "1");
    graph.gridSize =
      parseFloat(node.getAttribute("gridSize")) || mxGraph.prototype.gridSize;
  }

  configureFolding() {
    const { urlParams, graph, isChromelessView } = this.editor;
    const { node } = this;

    graph.foldingEnabled = node.getAttribute("fold") != "0";
    if (isChromelessView() && graph.foldingEnabled) {
      graph.foldingEnabled = urlParams["nav"] == "1";
      graph.cellRenderer.forceControlClickHandler = graph.foldingEnabled;
    }
  }

  configurePage() {
    this.pageConfig.configure();
  }

  configureBackground() {
    const { node, graph } = this;
    // Loads the persistent state settings
    const bg = node.getAttribute("background");
    graph.background = bg && bg.length > 0 ? bg : null;
  }

  /**
   * Sets the XML node for the current diagram.
   */
  readGraphState(node) {
    this.node = node;

    const { configurePage, configureGrid, configureFolding, graph } = this;
    configureGrid();

    graph.graphHandler.guidesEnabled = node.getAttribute("guides") != "0";
    graph.setTooltips(node.getAttribute("tooltips") != "0");
    graph.setConnectable(node.getAttribute("connect") != "0");
    graph.connectionArrowsEnabled = node.getAttribute("arrows") != "0";

    configureFolding();
    configurePage();
  }
}
