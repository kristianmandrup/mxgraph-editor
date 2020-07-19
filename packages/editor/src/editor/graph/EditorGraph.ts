import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
import { GraphStateReader } from "./state/GraphStateReader";
import { GraphXml } from "./xml";
import { GraphResetter } from "./reset";
const { mxEventObject } = mx;

interface IGraph {
  transparentBackground?: boolean;
  isBlankLink?: any;
}

export class EditorGraph {
  editor: Editor;
  graphStateReader: GraphStateReader;
  graphXml: GraphXml;

  /**
   * Default value for the graph container overflow style.
   */
  defaultGraphOverflow: string = "hidden";

  constructor(editor: Editor) {
    this.editor = editor;
    this.graphStateReader = this.createGraphStateReader();
    this.graphXml = this.createGraphXml();
  }

  createGraphXml() {
    return new GraphXml(this);
  }

  createGraphStateReader() {
    return new GraphStateReader(this.editor);
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
   * resets graph
   */
  resetGraph() {
    this.createGraphResetter().reset();
  }

  createGraphResetter() {
    return new GraphResetter(this);
  }

  /**
   * Sets the XML node for the current diagram.
   */
  readGraphState(node) {
    return this.graphStateReader.readGraphState(node);
  }

  /**
   * Sets the XML node for the current diagram.
   */
  setGraphXml(node) {
    return this.graphXml.setGraphXml(node);
  }

  /**
   * Returns the XML node that represents the current diagram.
   */
  getGraphXml(ignoreSelection) {
    return this.graphXml.getGraphXml(ignoreSelection);
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
