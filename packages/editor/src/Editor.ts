import mx from "@mxgraph-app/mx";
import { Images } from "./Images";
const {
  mxEventObject,
  mxCodec,
  mxRectangle,
  mxGraph,
  mxChildChange,
  mxUndoManager,
  mxPoint,
  mxEvent,
  mxClient,
  mxResources,
  mxUtils,
} = mx;

const Graph: any = {};

/**
 * Editor constructor executed on page load.
 */
export class Editor {
  undoMgr: any; // mxUndoManager
  documentMode: any;
  /**
   * Editor inherits from mxEventSource
   */
  // mxUtils.extend(Editor, mxEventSource);

  /**
   * Counts open editor tabs (must be global for cross-window access)
   */
  static pageCounter: any = 0;
  /**
   * Specifies if local storage should be used (eg. on the iPad which has no filesystem)
   */
  static useLocalStorage = typeof Storage != "undefined" && mxClient.IS_IOS;

  /**
   * Specifies the image URL to be used for the transparent background.
   */
  static ctrlKey = mxClient.IS_MAC ? "Cmd" : "Ctrl";

  /**
   * Specifies the image URL to be used for the transparent background.
   */
  static hintOffset = 20;

  /**
   * Specifies if the diagram should be saved automatically if possible. Default
   * is true.
   */
  static popupsAllowed = true;

  /**
   * Stores initial state of mxClient.NO_FO.
   */
  originalNoForeignObject: any = mxClient.NO_FO;

  transparentImage: string = Images.transparentImage;

  /**
   * Specifies if the canvas should be extended in all directions. Default is true.
   */
  extendCanvas: boolean = true;

  /**
   * Specifies if the app should run in chromeless mode. Default is false.
   * This default is only used if the contructor argument is null.
   */
  chromeless: boolean = false;

  /**
   * Specifies the order of OK/Cancel buttons in dialogs. Default is true.
   * Cancel first is used on Macs, Windows/Confluence uses cancel last.
   */
  cancelFirst: boolean = true;

  /**
   * Specifies if the editor is enabled. Default is true.
   */
  enabled: boolean = true;

  /**
   * Contains the name which was used for the last save. Default value is null.
   */
  filename?: string | null = null;

  /**
   * Contains the current modified state of the diagram. This is false for
   * new diagrams and after the diagram was saved.
   */
  modified: boolean = false;

  /**
   * Specifies if the diagram should be saved automatically if possible. Default
   * is true.
   */
  autosave: boolean = true;

  /**
   * Specifies the top spacing for the initial page view. Default is 0.
   */
  initialTopSpacing: number = 0;

  /**
   * Specifies the app name. Default is document.title.
   */
  appName: string = document.title;

  /**
   *
   */
  editBlankUrl: string =
    window.location.protocol + "//" + window.location.host + "/";

  /**
   * Default value for the graph container overflow style.
   */
  defaultGraphOverflow: string = "hidden";

  editable: boolean;
  graph: any;
  undoManager: any;
  status: string;

  onDialogClose: any;
  dialogImg: any;
  bg: any;
  container: any;
  resizeListener: any;

  constructor(chromeless, themes, model, graph, editable) {
    // mxEventSource.call(this);
    this.chromeless = chromeless != null ? chromeless : this.chromeless;
    this.initStencilRegistry();
    this.graph = graph || this.createGraph(themes, model);
    this.editable = editable != null ? editable : !chromeless;
    this.undoManager = this.createUndoManager();
    this.status = "";
  }

  get urlParams(): any {
    return {};
  }

  getOrCreateFilename() {
    return (
      this.filename || mxResources.get("drawing", [Editor.pageCounter]) + ".xml"
    );
  }

  getFilename() {
    return this.filename;
  }

  // Sets the status and fires a statusChanged event
  setStatus(value) {
    this.status = value;
    this.dispatch("statusChanged");
  }

  dispatch(_event) {
    // this.fireEvent(new mxEventObject('statusChanged'));
  }

  // Returns the current status
  getStatus() {
    return this.status;
  }

  // Updates modified state if graph changes
  graphChangeListener(_sender, eventObject) {
    var edit = eventObject != null ? eventObject.getProperty("edit") : null;

    if (edit == null || !edit.ignoreEdit) {
      this.setModified(true);
    }
  }

  addChangeListener() {
    const model = this.graph.getModel();
    model.addListener(mxEvent.CHANGE, () => {
      model.graphChangeListener.apply(this, arguments);
    });

    // Sets persistent graph state defaults
    this.graph.resetViewOnRootChange = false;
    this.init();
  }

  // Cross-domain window access is not allowed in FF, so if we
  // were opened from another domain then this will fail.
  setup() {
    try {
      var op: any = window;

      while (
        op.opener != null &&
        typeof op.opener.Editor !== "undefined" &&
        !isNaN(op.opener.Editor.pageCounter) &&
        // Workaround for possible infinite loop in FF https://drawio.atlassian.net/browse/DS-795
        op.opener != op
      ) {
        op = op.opener;
      }

      // Increments the counter in the first opener in the chain
      if (op != null) {
        op.Editor.pageCounter++;
        Editor.pageCounter = op.Editor.pageCounter;
      }
    } catch (e) {
      // ignore
    }
  }

  /**
   * Initializes the environment.
   */
  init() {}

  /**
   * Sets the XML node for the current diagram.
   */
  isChromelessView() {
    return this.chromeless;
  }

  /**
   * Sets the XML node for the current diagram.
   */
  setAutosave(value) {
    this.autosave = value;
    this.dispatch("autosaveChanged");
    // this.fireEvent(new mxEventObject('autosaveChanged'));
  }

  /**
   *
   */
  getEditBlankUrl(params) {
    return this.editBlankUrl + params;
  }

  /**
   *
   */
  editAsNew(xml, title) {
    const { urlParams } = this;
    var p = title != null ? "?title=" + encodeURIComponent(title) : "";

    if (urlParams["ui"] != null) {
      p += (p.length > 0 ? "&" : "?") + "ui=" + urlParams["ui"];
    }

    if (
      typeof window.postMessage !== "undefined" &&
      (this.documentMode == null || this.documentMode >= 10)
    ) {
      var wnd: any = null;

      var l = (evt) => {
        if (evt.data == "ready" && evt.source == wnd) {
          mxEvent.removeListener(window, "message", l);
          wnd.postMessage(xml, "*");
        }
      };

      mxEvent.addListener(window, "message", l);
      wnd = this.graph.openLink(
        this.getEditBlankUrl(p + (p.length > 0 ? "&" : "?") + "client=1"),
        null,
        true
      );
    } else {
      this.graph.openLink(
        this.getEditBlankUrl(p) + "#R" + encodeURIComponent(xml)
      );
    }
  }

  /**
   * Sets the XML node for the current diagram.
   */
  createGraph(themes, model) {
    var graph = new Graph(null, model, null, null, themes);
    graph.transparentBackground = false;

    // Opens all links in a new window while editing
    if (!this.chromeless) {
      graph.isBlankLink = function (href) {
        return !this.isExternalProtocol(href);
      };
    }
    return graph;
  }

  /**
   * Sets the XML node for the current diagram.
   */
  resetGraph() {
    const { urlParams } = this;
    this.graph.gridEnabled =
      !this.isChromelessView() || urlParams["grid"] == "1";
    this.graph.graphHandler.guidesEnabled = true;
    this.graph.setTooltips(true);
    this.graph.setConnectable(true);
    this.graph.foldingEnabled = true;
    this.graph.scrollbars = this.graph.defaultScrollbars;
    this.graph.pageVisible = this.graph.defaultPageVisible;
    this.graph.pageBreaksVisible = this.graph.pageVisible;
    this.graph.preferPageSize = this.graph.pageBreaksVisible;
    this.graph.background = null;
    this.graph.pageScale = mxGraph.prototype.pageScale;
    this.graph.pageFormat = mxGraph.prototype.pageFormat;
    this.graph.currentScale = 1;
    this.graph.currentTranslate.x = 0;
    this.graph.currentTranslate.y = 0;
    this.updateGraphComponents();
    this.graph.view.setScale(1);
  }

  /**
   * Sets the XML node for the current diagram.
   */
  readGraphState(node) {
    const { urlParams } = this;
    this.graph.gridEnabled =
      node.getAttribute("grid") != "0" &&
      (!this.isChromelessView() || urlParams["grid"] == "1");
    this.graph.gridSize =
      parseFloat(node.getAttribute("gridSize")) || mxGraph.prototype.gridSize;
    this.graph.graphHandler.guidesEnabled = node.getAttribute("guides") != "0";
    this.graph.setTooltips(node.getAttribute("tooltips") != "0");
    this.graph.setConnectable(node.getAttribute("connect") != "0");
    this.graph.connectionArrowsEnabled = node.getAttribute("arrows") != "0";
    this.graph.foldingEnabled = node.getAttribute("fold") != "0";

    if (this.isChromelessView() && this.graph.foldingEnabled) {
      this.graph.foldingEnabled = urlParams["nav"] == "1";
      this.graph.cellRenderer.forceControlClickHandler = this.graph.foldingEnabled;
    }

    var ps = parseFloat(node.getAttribute("pageScale"));

    if (!isNaN(ps) && ps > 0) {
      this.graph.pageScale = ps;
    } else {
      this.graph.pageScale = mxGraph.prototype.pageScale;
    }

    if (!this.graph.isLightboxView() && !this.graph.isViewer()) {
      var pv = node.getAttribute("page");

      if (pv != null) {
        this.graph.pageVisible = pv != "0";
      } else {
        this.graph.pageVisible = this.graph.defaultPageVisible;
      }
    } else {
      this.graph.pageVisible = false;
    }

    this.graph.pageBreaksVisible = this.graph.pageVisible;
    this.graph.preferPageSize = this.graph.pageBreaksVisible;

    var pw = parseFloat(node.getAttribute("pageWidth"));
    var ph = parseFloat(node.getAttribute("pageHeight"));

    if (!isNaN(pw) && !isNaN(ph)) {
      this.graph.pageFormat = new mxRectangle(0, 0, pw, ph);
    }

    // Loads the persistent state settings
    var bg = node.getAttribute("background");

    if (bg != null && bg.length > 0) {
      this.graph.background = bg;
    } else {
      this.graph.background = null;
    }
  }

  /**
   * Sets the XML node for the current diagram.
   */
  setGraphXml(node) {
    if (node != null) {
      var dec = new mxCodec(node.ownerDocument);

      if (node.nodeName == "mxGraphModel") {
        this.graph.model.beginUpdate();

        try {
          this.graph.model.clear();
          this.graph.view.scale = 1;
          this.readGraphState(node);
          this.updateGraphComponents();
          dec.decode(node, this.graph.getModel());
        } finally {
          this.graph.model.endUpdate();
        }

        this.fireEvent(new mxEventObject("resetGraphView"));
      } else if (node.nodeName == "root") {
        this.resetGraph();

        // Workaround for invalid XML output in Firefox 20 due to bug in mxUtils.getXml
        var wrapper = dec.document.createElement("mxGraphModel");
        wrapper.appendChild(node);

        dec.decode(wrapper, this.graph.getModel());
        this.updateGraphComponents();
        this.fireEvent(new mxEventObject("resetGraphView"));
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
      this.graph.model.clear();
      this.fireEvent("resetGraphView");
    }
  }

  fireEvent(_event) {
    // on mxEventSource
    // this.fireEvent(new mxEventObject('resetGraphView'));
  }

  /**
   * Returns the XML node that represents the current diagram.
   */
  getGraphXml(ignoreSelection) {
    ignoreSelection = ignoreSelection != null ? ignoreSelection : true;
    var node: any = null;

    if (ignoreSelection) {
      var enc = new mxCodec(mxUtils.createXmlDocument());
      node = enc.encode(this.graph.getModel());
    } else {
      node = this.graph.encodeCells(
        mxUtils.sortCells(
          this.graph.model.getTopmostCells(this.graph.getSelectionCells())
        )
      );
    }

    if (this.graph.view.translate.x != 0 || this.graph.view.translate.y != 0) {
      node.setAttribute(
        "dx",
        Math.round(this.graph.view.translate.x * 100) / 100
      );
      node.setAttribute(
        "dy",
        Math.round(this.graph.view.translate.y * 100) / 100
      );
    }

    node.setAttribute("grid", this.graph.isGridEnabled() ? "1" : "0");
    node.setAttribute("gridSize", this.graph.gridSize);
    node.setAttribute(
      "guides",
      this.graph.graphHandler.guidesEnabled ? "1" : "0"
    );
    node.setAttribute(
      "tooltips",
      this.graph.tooltipHandler.isEnabled() ? "1" : "0"
    );
    node.setAttribute(
      "connect",
      this.graph.connectionHandler.isEnabled() ? "1" : "0"
    );
    node.setAttribute("arrows", this.graph.connectionArrowsEnabled ? "1" : "0");
    node.setAttribute("fold", this.graph.foldingEnabled ? "1" : "0");
    node.setAttribute("page", this.graph.pageVisible ? "1" : "0");
    node.setAttribute("pageScale", this.graph.pageScale);
    node.setAttribute("pageWidth", this.graph.pageFormat.width);
    node.setAttribute("pageHeight", this.graph.pageFormat.height);

    if (this.graph.background != null) {
      node.setAttribute("background", this.graph.background);
    }

    return node;
  }

  /**
   * Keeps the graph container in sync with the persistent graph state
   */
  updateGraphComponents() {
    var graph = this.graph;

    if (graph.container != null) {
      graph.view.validateBackground();
      graph.container.style.overflow = graph.scrollbars
        ? "auto"
        : this.defaultGraphOverflow;

      this.fireEvent(new mxEventObject("updateGraphComponents"));
    }
  }

  /**
   * Sets the modified flag.
   */
  setModified(value) {
    this.modified = value;
  }

  /**
   * Sets the filename.
   */
  setFilename(value) {
    this.filename = value;
  }

  undoListener(_sender, evt) {
    this.undoMgr.undoableEditHappened(evt.getProperty("edit"));
  }

  // Installs the command history
  listener(_sender, _evt) {
    this.graph.undoListener.apply(this, arguments);
  }

  // Keeps the selection in sync with the history
  undoHandler(_sender, evt) {
    const { graph } = this;
    var cand = graph.getSelectionCellsForChanges(
      evt.getProperty("edit").changes,
      function (change) {
        // Only selects changes to the cell hierarchy
        return !(change instanceof mxChildChange);
      }
    );

    if (cand.length > 0) {
      // var model = graph.getModel();
      var cells = [];

      for (var i = 0; i < cand.length; i++) {
        const candidate = cand[i];
        if (graph.view.getState(candidate) != null) {
          this.addCell(cells, candidate);
        }
      }
      graph.setSelectionCells(cells);
    }
  }

  addCell(cells, cell) {
    cells.push(cell);
  }

  /**
   * Creates and returns a new undo manager.
   */
  createUndoManager() {
    const { undoMgr, graph, listener } = this;
    this.undoMgr = new mxUndoManager(200);

    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);

    undoMgr.addListener(mxEvent.UNDO, this.undoHandler);
    undoMgr.addListener(mxEvent.REDO, this.undoHandler);

    return undoMgr;
  }

  /**
   * Adds basic stencil set (no namespace).
   */
  initStencilRegistry() {}

  /**
   * ??????????????
   * Creates and returns a new undo manager.
   */
  destroy() {
    if (this.graph != null) {
      this.graph.destroy();
      this.graph = null;
    }
  }

  /**
   * Removes the dialog from the DOM.
   */
  getPosition(left, top) {
    return new mxPoint(left, top);
  }

  /**
   * Removes the dialog from the DOM.
   */
  close(cancel, isEsc) {
    if (this.onDialogClose) {
      if (this.onDialogClose(cancel, isEsc) == false) {
        return false;
      }

      this.onDialogClose = null;
    }

    if (this.dialogImg) {
      this.dialogImg.parentNode.removeChild(this.dialogImg);
      this.dialogImg = null;
    }

    if (this.bg && this.bg.parentNode) {
      this.bg.parentNode.removeChild(this.bg);
    }

    mxEvent.removeListener(window, "resize", this.resizeListener);
    this.container.parentNode.removeChild(this.container);
    return true;
  }
}
