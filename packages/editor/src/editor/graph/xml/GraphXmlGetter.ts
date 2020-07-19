import mx from "@mxgraph-app/mx";
import { BaseGraphXml } from "./BaseGraphXml";
const { mxCodec, mxUtils } = mx;

export class GraphXmlGetter extends BaseGraphXml {
  node: any;
  ignoreSelection: boolean = true;

  getNode() {
    const { ignoreSelection, encodeSelectedCells, loadFromXmlDocument } = this;
    return ignoreSelection ? loadFromXmlDocument() : encodeSelectedCells();
  }

  encodeSelectedCells() {
    const { graph } = this;
    return graph.encodeCells(
      mxUtils.sortCells(graph.model.getTopmostCells(graph.getSelectionCells()))
    );
  }

  createEncoder() {
    return new mxCodec(mxUtils.createXmlDocument());
  }

  loadFromXmlDocument() {
    const { createEncoder, graph } = this;
    return createEncoder().encode(graph.getModel());
  }

  setNode() {
    this.node = this.getNode();
    return this.node;
  }

  nodeDeltaConfig() {
    const { node, graph } = this;
    if (graph.view.translate.x != 0 || graph.view.translate.y != 0) {
      node.setAttribute("dx", Math.round(graph.view.translate.x * 100) / 100);
      node.setAttribute("dy", Math.round(graph.view.translate.y * 100) / 100);
    }
    return this;
  }

  nodePageConfig() {
    const { node, graph } = this;
    node.setAttribute("page", graph.pageVisible ? "1" : "0");
    node.setAttribute("pageScale", graph.pageScale);
    node.setAttribute("pageWidth", graph.pageFormat.width);
    node.setAttribute("pageHeight", graph.pageFormat.height);
    return this;
  }

  nodeGridConfig() {
    const { node, graph } = this;

    node.setAttribute("grid", graph.isGridEnabled() ? "1" : "0");
    node.setAttribute("gridSize", graph.gridSize);
    return this;
  }

  nodeBackgroundConfig() {
    const { node, graph } = this;
    if (!graph.background) return;
    node.setAttribute("background", graph.background);
    return this;
  }

  /**
   * Returns the XML node that represents the current diagram.
   */
  getGraphXml(ignoreSelection = true) {
    const {
      setNode,
      nodeDeltaConfig,
      nodePageConfig,
      nodeGridConfig,
      nodeBackgroundConfig,
      graph,
    } = this;
    this.ignoreSelection = ignoreSelection;
    setNode();

    nodeDeltaConfig();

    const { node } = this;
    nodeGridConfig();

    node.setAttribute("guides", graph.graphHandler.guidesEnabled ? "1" : "0");
    node.setAttribute("tooltips", graph.tooltipHandler.isEnabled() ? "1" : "0");
    node.setAttribute(
      "connect",
      graph.connectionHandler.isEnabled() ? "1" : "0"
    );

    node.setAttribute("arrows", graph.connectionArrowsEnabled ? "1" : "0");
    node.setAttribute("fold", graph.foldingEnabled ? "1" : "0");

    nodePageConfig();
    nodeBackgroundConfig();

    return node;
  }
}
