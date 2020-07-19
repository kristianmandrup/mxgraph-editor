import mx from "@mxgraph-app/mx";
import { BaseGraphXml } from "./BaseGraphXml";
const { mxResources, mxEventObject, mxCodec } = mx;

export class GraphXmlSetter extends BaseGraphXml {
  node: any;
  /**
   * Sets the XML node for the current diagram.
   */
  setGraphXml(node) {
    this.node = node;
    const { setWithNode, reset } = this;
    setWithNode() || reset();
  }

  reset() {
    const { eg, clear, fireEvent } = this;
    const { resetGraph } = eg;

    resetGraph();
    clear();
    fireEvent("resetGraphView");
  }

  clear() {
    const { graph } = this;
    graph.model.clear();
  }

  get dec() {
    return new mxCodec(this.node.ownerDocument);
  }

  setWithNode(node?) {
    node = node || this.node;
    if (!node) return;
    this.node = node;
    const { setGraphModelNode, setRootNode, handleInvalidNode } = this;
    return setGraphModelNode() || setRootNode() || handleInvalidNode();
  }

  handleInvalidNode() {
    const { node } = this;
    throw {
      message: mxResources.get("cannotOpenFile"),
      node,
      toString: function () {
        return this.message;
      },
    };
  }

  setGraphModelNode() {
    const { node, notifyResetGraphView, executeGraphModelTransaction } = this;
    if (node.nodeName !== "mxGraphModel") return;

    executeGraphModelTransaction();
    notifyResetGraphView();
    return true;
  }

  executeGraphModelTransaction() {
    const { node, eg, dec, graph } = this;
    const { readGraphState, updateGraphComponents } = eg;
    graph.model.beginUpdate();
    try {
      graph.model.clear();
      graph.view.scale = 1;
      readGraphState(node);
      updateGraphComponents();
      dec.decode(node, graph.getModel());
    } finally {
      graph.model.endUpdate();
    }
  }

  setRootNode() {
    const { node, eg, notifyResetGraphView, dec, graph, createWrapper } = this;
    const { resetGraph, updateGraphComponents } = eg;
    if (node.nodeName !== "root") return;
    resetGraph();
    const wrapper = createWrapper();
    dec.decode(wrapper, graph.getModel());
    updateGraphComponents();
    notifyResetGraphView();
  }

  notifyResetGraphView() {
    this.fireEvent(new mxEventObject("resetGraphView"));
  }

  createWrapper() {
    const { dec, node } = this;
    // Workaround for invalid XML output in Firefox 20 due to bug in mxUtils.getXml
    var wrapper = dec.document.createElement("mxGraphModel");
    wrapper.appendChild(node);
    return wrapper;
  }
}
