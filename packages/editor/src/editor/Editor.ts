import mx from "@mxgraph-app/mx";
import { Images } from "./Images";
import { UndoManagerFactory } from "./undo";
import { EditorGraph } from "./graph/EditorGraph";
import { Undo } from "./undo/Undo";
import { NewEdit } from "./edit";
import { EditorSetup } from "./setup";
const { mxPoint, mxEvent, mxClient, mxResources } = mx;

//const Graph: any = {};

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

  editable: boolean = true;
  graph: any;
  undoManager: any;
  status: string;

  onDialogClose: any;
  dialogImg: any;
  bg: any;
  container: any;
  resizeListener: any;

  undoManagerFactory: UndoManagerFactory;
  editorGraph: EditorGraph;
  undo: Undo;
  newEdit: NewEdit;
  editorSetup: EditorSetup;

  constructor(chromeless, themes, model, graph, editable) {
    // mxEventSource.call(this);
    this.chromeless = chromeless != null ? chromeless : this.chromeless;
    this.initStencilRegistry();
    this.graph = graph || this.createGraph(themes, model);
    this.editable = editable != null ? editable : !chromeless;
    this.undoManager = this.createUndoManager();
    this.editorGraph = this.createEditorGraph();
    this.undoManagerFactory = this.createUndoManagerFactory();
    this.undo = new Undo(this);
    this.newEdit = new NewEdit(this);
    this.editorSetup = new EditorSetup();
    this.status = "";
  }

  createEditorGraph() {
    return new EditorGraph(this);
  }

  createUndoManagerFactory() {
    return new UndoManagerFactory(this);
  }

  get urlParams(): any {
    return {};
  }

  // TODO
  isExternalProtocol(_href): boolean {
    return false;
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
    this.editorSetup.setup();
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
    this.newEdit.editAsNew(xml, title);
  }

  /**
   * Sets the XML node for the current diagram.
   */
  createGraph(themes, model): any {
    return this.editorGraph.createGraph(themes, model);
  }

  /**
   * Sets the XML node for the current diagram.
   */
  resetGraph() {
    this.editorGraph.resetGraph();
  }

  /**
   * Sets the XML node for the current diagram.
   */
  readGraphState(node) {
    return this.editorGraph.readGraphState(node);
  }

  /**
   * Sets the XML node for the current diagram.
   */
  setGraphXml(node) {
    this.editorGraph.setGraphXml(node);
  }

  fireEvent(_event) {
    // on mxEventSource
    // this.fireEvent(new mxEventObject('resetGraphView'));
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
  undoHandler(sender, evt) {
    this.undo.undoHandler(sender, evt);
  }

  /**
   * Creates and returns a new undo manager.
   */
  createUndoManager() {
    this.undoManagerFactory.createUndoManager();
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
