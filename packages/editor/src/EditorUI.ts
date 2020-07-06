import mx from "@mxgraph-app/mx";
import resources from "@mxgraph-app/resources";
import { Factory } from "./Factory";
import { DialogsFactory } from "./dialogs/DialogsFactory";
import { ColorDialog } from "./dialogs/ColorDialog";
import { ErrorDialog } from "./dialogs/ErrorDialog";
import { DialogManager } from "./dialogs/DialogManager";
import { UndoRedo } from "./undo/UndoRedo";
import { Splitter } from "./splitter";
import { PageConfig } from "./PageConfig";
import { OpenFileDialog } from "./dialogs/OpenFileDialog";
import { ImageDialog } from "./dialogs";
import { LinkDialog } from "./dialogs/LinkDialog";
import { EditDataDialog } from "./dialogs/EditDataDialog";
import { BackgroundImageDialog } from "./dialogs/BackgroundImageDialog";
import { UiDisplay } from "./ui";
import { GraphExtracter } from "./extract";
import { Layouter } from "./layout";
const {
  mxOutline,
  mxClient,
  mxRectangle,
  mxEventObject,
  mxPoint,
  mxEvent,
  mxUtils,
  mxResources,
} = mx;

const { urlParams } = resources;

const Graph: any = {};
const Editor: any = {};

export class EditorUI {
  chromelessToolbar: any;
  layersDialog: any;
  keyHandler: any;
  keydownHandler: any;
  keyupHandler: any;
  resizeHandler: any;
  gestureHandler: any;
  orientationChangeHandler: any;
  scrollHandler: any;

  documentMode: any;
  dialogs: any[] = [];
  dialog: any;
  destroyFunctions: any = [];
  actions: any;
  editor: any;
  container: any;
  sidebar: any;
  toolbar: any;
  menubarContainer: any;
  toolbarContainer: any;
  sidebarContainer: any;
  sidebarFooterContainer: any;
  formatContainer: any;
  diagramContainer: any;
  footerContainer: any;
  tabContainer: any;
  statusContainer: any;
  menus: any;
  menubar: any;
  hsplit: any;
  format: any;
  $openFile: any;
  updateDocumentTitle: any; // fn
  addListener: any;

  factory: Factory;
  dialogFactory: DialogsFactory;

  colorDialog: ColorDialog;
  errorDialog: ErrorDialog;
  openFileDialog: OpenFileDialog;
  imageDialog: ImageDialog;
  linkDialog: LinkDialog;
  editDataDialog: EditDataDialog;
  backgroundImageDialog: BackgroundImageDialog;
  graphExtracter: GraphExtracter;

  uiDisplay: UiDisplay;
  layouter: Layouter;

  dialogManager: DialogManager;
  undoRedo: UndoRedo;
  splitter: Splitter;
  pageConfig: PageConfig;

  constructor() {
    this.factory = new Factory();
    this.dialogFactory = new DialogsFactory(this);
    this.colorDialog = new ColorDialog(this);
    this.errorDialog = new ErrorDialog(this);
    this.openFileDialog = new OpenFileDialog(this);
    this.imageDialog = new ImageDialog(this);
    this.linkDialog = new LinkDialog(this);
    this.editDataDialog = new EditDataDialog(this);
    this.backgroundImageDialog = new BackgroundImageDialog(this);
    this.uiDisplay = new UiDisplay(this);
    this.layouter = new Layouter(this);

    this.graphExtracter = new GraphExtracter(this);

    this.dialogManager = new DialogManager(this);
    this.undoRedo = new UndoRedo(this);
    this.splitter = new Splitter(this);
    this.pageConfig = new PageConfig(this);
  }

  refresh() {
    // use Refresher
  }

  /**
   * Global config that specifies if the compact UI elements should be used.
   */
  static compactUi = true;

  /**
   * Specifies the size of the split bar.
   */
  splitSize = mxClient.IS_TOUCH || mxClient.IS_POINTER ? 12 : 8;

  /**
   * Specifies the height of the menubar. Default is 30.
   */
  menubarHeight = 30;

  /**
   * Specifies the width of the format panel should be enabled. Default is true.
   */
  formatEnabled = true;

  /**
   * Specifies the width of the format panel. Default is 240.
   */
  formatWidth = 240;

  /**
   * Specifies the height of the toolbar. Default is 38.
   */
  toolbarHeight = 38;

  /**
   * Specifies the height of the footer. Default is 28.
   */
  footerHeight = 28;

  /**
   * Specifies the height of the optional sidebarFooterContainer. Default is 34.
   */
  sidebarFooterHeight = 34;

  /**
   * Specifies the position of the horizontal split bar. Default is 240 or 118 for
   * screen widths <= 640px.
   */
  hsplitPosition =
    screen.width <= 640
      ? 118
      : urlParams["sidebar-entries"] != "large"
      ? 212
      : 240;

  /**
   * Specifies if animations are allowed in <executeLayout>. Default is true.
   */
  allowAnimation = true;

  /**
   * Default is 2.
   */
  lightboxMaxFitScale = 2;

  /**
   * Default is 4.
   */
  lightboxVerticalDivider = 4;

  /**
   * Specifies if single click on horizontal split should collapse sidebar. Default is false.
   */
  hsplitClickEnabled = false;

  /**
   * "Installs" menus in EditorUi.
   */
  createMenus() {
    return this.factory.createMenus();
  }

  init(url) {
    // editorUiInit.apply(this, arguments);
    this.actions.get("export").setEnabled(false);

    // Updates action states which require a backend
    if (!Editor.useLocalStorage) {
      mxUtils.post(url, "", this.onOpen, this.onError);
    }
  }

  onOpen = (req) => {
    var enabled = req.getStatus() != 404;
    this.actions.get("open").setEnabled(enabled || Graph.fileSupport);
    this.actions.get("import").setEnabled(enabled || Graph.fileSupport);
    this.actions.get("save").setEnabled(enabled);
    this.actions.get("saveAs").setEnabled(enabled);
    this.actions.get("export").setEnabled(enabled);
  };

  onError = (_err) => {};

  fireEvent(_event) {
    // this.fireEvent(new mxEventObject("backgroundColorChanged"));
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setBackgroundColor(value) {
    this.editor.graph.background = value;
    this.editor.graph.view.validateBackground();

    this.fireEvent(new mxEventObject("backgroundColorChanged"));
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setFoldingEnabled(value) {
    this.editor.graph.foldingEnabled = value;
    this.editor.graph.view.revalidate();
    this.fireEvent(new mxEventObject("foldingEnabledChanged"));
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setPageFormat(value) {
    this.pageConfig.setPageFormat(value);
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setPageScale(value) {
    this.pageConfig.setPageScale(value);
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setGridColor(value) {
    this.editor.graph.view.gridColor = value;
    this.editor.graph.view.validateBackground();
    this.fireEvent(new mxEventObject("gridColorChanged"));
  }

  /**
   * Updates the states of the given undo/redo items.
   */
  addUndoListener() {
    this.undoRedo.addUndoListener();
  }

  zeroOffset = new mxPoint(0, 0);

  getDiagramContainerOffset() {
    return this.zeroOffset;
  }

  /**
   * Creates the required containers.
   */
  createDivs() {
    this.uiDisplay.createDivs();
  }

  /**
   * Hook for sidebar footer container. This implementation returns null.
   */
  createSidebarFooterContainer() {
    return null;
  }

  /**
   * Creates the required containers.
   */
  createUi() {
    this.uiDisplay.createUi();
  }

  /**
   * Updates the states of the given undo/redo items.
   */
  addSplitHandler(elt, horizontal, dx, onChange) {
    this.splitter.addSplitHandler(elt, horizontal, dx, onChange);
  }

  /**
   * Translates this point by the given vector.
   *
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  handleError(resp, title, fn, invokeFnOnClose, _notFoundMessage) {
    var e = resp != null && resp.error != null ? resp.error : resp;

    if (e != null || title != null) {
      var msg = mxUtils.htmlEntities(mxResources.get("unknownError"));
      var btn = mxResources.get("ok");
      title = title != null ? title : mxResources.get("error");

      if (e != null && e.message != null) {
        msg = mxUtils.htmlEntities(e.message);
      }

      invokeFnOnClose = invokeFnOnClose ? fn : null;
      const opts = { title, msg, btn, fn, invokeFnOnClose };

      this.showError(opts);
    } else if (fn != null) {
      fn();
    }
  }

  /**
   * Translates this point by the given vector.
   *
   * @param {number} dx X-coordinate of the translation.
   * @param {number} dy Y-coordinate of the translation.
   */
  showError(
    opts: any = {}
    // title,
    // msg,
    // btn,
    // fn,
    // retry,
    // btn2,
    // fn2,
    // btn3,
    // fn3,
    // w,
    // h,
    // hide,
    // onClose
  ) {
    this.errorDialog.displayErrorDialog(opts);
    // // const $btn = btn || mxResources.get("ok");
    // var dlg = this.dialogFactory.createErrorDialog(opts);
    // //   this, title, msg, $btn, {
    // //   fn,
    // //   retry,
    // //   btn2,
    // //   fn2,
    // //   hide,
    // //   btn3,
    // //   fn3,
    // // });
    // var lines = Math.ceil(msg != null ? msg.length / 50 : 1);
    // this.showDialog(
    //   dlg.container,
    //   w || 340,
    //   h || 100 + lines * 20,
    //   true,
    //   false,
    //   onClose
    // );
    // dlg.init();
  }

  /**
   * Displays a print dialog.
   */
  showDialog(
    opts: any = {}
    // elt,
    // w,
    // h,
    // modal,
    // closable,
    // onClose?,
    // noScroll?,
    // transparent?,
    // onResize?,
    // ignoreBgClick?
  ) {
    this.editor.graph.tooltipHandler.hideTooltip();

    if (this.dialogs == null) {
      this.dialogs = [];
    }

    this.dialog = this.dialogFactory.createDialog(opts);
    //   this,
    //   elt,
    //   w,
    //   h,
    //   modal,
    //   closable,
    //   onClose,
    //   noScroll,
    //   transparent,
    //   onResize,
    //   ignoreBgClick
    // );
    this.dialogs.push(this.dialog);
  }

  /**
   */
  hideDialog(cancel, isEsc?) {
    this.dialogManager.hideDialog(cancel, isEsc);
  }

  get graph() {
    return this.editor.graph;
  }

  get selState() {
    return this.graph.cellEditor.saveSelection();
  }

  /**
   * Display a color dialog.
   */
  pickColor(color, apply) {
    this.colorDialog.pickColor(color, apply);
  }

  /**
   * Adds the label menu items to the given menu and parent.
   */
  openFile() {
    this.openFileDialog.openFile();
  }

  /**
   * Extracs the graph model from the given HTML data from a data transfer event.
   */
  extractGraphModelFromHtml(data) {
    return this.graphExtracter.extractGraphModelFromHtml(data);
  }

  /**
   * Opens the given files in the editor.
   */
  extractGraphModelFromEvent(evt) {
    return this.graphExtracter.extractGraphModelFromEvent(evt);
  }

  /**
   * Hook for subclassers to return true if event data is a supported format.
   * This implementation always returns false.
   */
  isCompatibleString(_data) {
    return false;
  }

  showFileNameDialog() {
    this.openFileDialog.openFile();
  }

  /**
   * Executes the given layout.
   */
  executeLayout(exec, animate, post) {
    this.layouter.executeLayout(exec, animate, post);
  }

  /**
   * Hides the current menu.
   */
  showImageDialog(title, value, fn, _ignoreExisting) {
    this.imageDialog.showImageDialog(title, value, fn, _ignoreExisting);
  }

  /**
   * Hides the current menu.
   */
  showLinkDialog(value, btnLabel, fn) {
    this.linkDialog.showLinkDialog(value, btnLabel, fn);
  }

  /**
   * Hides the current menu.
   */
  showDataDialog(cell) {
    this.editDataDialog.showDataDialog(cell);
  }

  /**
   * Hides the current menu.
   */
  showBackgroundImageDialog(apply) {
    this.backgroundImageDialog.showBackgroundImageDialog(apply);
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setBackgroundImage(image) {
    this.editor.graph.setBackgroundImage(image);
    this.editor.graph.view.validateBackgroundImage();

    this.fireEvent(new mxEventObject("backgroundImageChanged"));
  }

  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  confirm(msg, okFn, cancelFn) {
    if (mxUtils.confirm(msg)) {
      if (okFn != null) {
        okFn();
      }
    } else if (cancelFn != null) {
      cancelFn();
    }
  }

  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  createOutline(_wnd) {
    var outline = new mxOutline(this.editor.graph, undefined);
    outline.border = 20;

    mxEvent.addListener(window, "resize", () => {
      outline.update(null);
    });

    this.addListener("pageFormatChanged", () => {
      outline.update(null);
    });
    return outline;
  }

  // Alt+Shift+Keycode mapping to action
  altShiftActions = {
    67: "clearWaypoints", // Alt+Shift+C
    65: "connectionArrows", // Alt+Shift+A
    76: "editLink", // Alt+Shift+L
    80: "connectionPoints", // Alt+Shift+P
    84: "editTooltip", // Alt+Shift+T
    86: "pasteSize", // Alt+Shift+V
    88: "copySize", // Alt+Shift+X
  };

  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  destroy() {
    if (this.editor != null) {
      this.editor.destroy();
      this.editor = null;
    }

    if (this.menubar != null) {
      this.menubar.destroy();
      this.menubar = null;
    }

    if (this.toolbar != null) {
      this.toolbar.destroy();
      this.toolbar = null;
    }

    if (this.sidebar != null) {
      this.sidebar.destroy();
      this.sidebar = null;
    }

    if (this.keyHandler != null) {
      this.keyHandler.destroy();
      this.keyHandler = null;
    }

    if (this.keydownHandler != null) {
      mxEvent.removeListener(document, "keydown", this.keydownHandler);
      this.keydownHandler = null;
    }

    if (this.keyupHandler != null) {
      mxEvent.removeListener(document, "keyup", this.keyupHandler);
      this.keyupHandler = null;
    }

    if (this.resizeHandler != null) {
      mxEvent.removeListener(window, "resize", this.resizeHandler);
      this.resizeHandler = null;
    }

    if (this.gestureHandler != null) {
      mxEvent.removeGestureListeners(document, this.gestureHandler, null, null);
      this.gestureHandler = null;
    }

    if (this.orientationChangeHandler != null) {
      mxEvent.removeListener(
        window,
        "orientationchange",
        this.orientationChangeHandler
      );
      this.orientationChangeHandler = null;
    }

    if (this.scrollHandler != null) {
      mxEvent.removeListener(window, "scroll", this.scrollHandler);
      this.scrollHandler = null;
    }

    if (this.destroyFunctions != null) {
      for (var i = 0; i < this.destroyFunctions.length; i++) {
        this.destroyFunctions[i]();
      }

      this.destroyFunctions = null;
    }

    var c = [
      this.menubarContainer,
      this.toolbarContainer,
      this.sidebarContainer,
      this.formatContainer,
      this.diagramContainer,
      this.footerContainer,
      this.chromelessToolbar,
      this.hsplit,
      this.sidebarFooterContainer,
      this.layersDialog,
    ];

    for (var i = 0; i < c.length; i++) {
      if (c[i] != null && c[i].parentNode != null) {
        c[i].parentNode.removeChild(c[i]);
      }
    }
  }

  /**
   *
   */
  getEditBlankXml() {
    return mxUtils.getXml(this.editor.getGraphXml());
  }

  /**
   * Returns the URL for a copy of this editor with no state.
   */
  getUrl(pathname) {
    var href = pathname != null ? pathname : window.location.pathname;
    var parms = href.indexOf("?") > 0 ? 1 : 0;

    // Removes template URL parameter for new blank diagram
    for (var key in urlParams) {
      if (parms == 0) {
        href += "?";
      } else {
        href += "&";
      }

      href += key + "=" + urlParams[key];
      parms++;
    }

    return href;
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
    var graph = this.editor.graph;

    if (!this.editor.extendCanvas) {
      graph.container.scrollTop = 0;
      graph.container.scrollLeft = 0;

      if (!mxUtils.hasScrollbars(graph.container)) {
        graph.view.setTranslate(0, 0);
      }
    } else if (!this.editor.isChromelessView()) {
      if (mxUtils.hasScrollbars(graph.container)) {
        if (graph.pageVisible) {
          var pad = graph.getPagePadding();
          graph.container.scrollTop =
            Math.floor(pad.y - this.editor.initialTopSpacing) - 1;
          graph.container.scrollLeft =
            Math.floor(
              Math.min(
                pad.x,
                (graph.container.scrollWidth - graph.container.clientWidth) / 2
              )
            ) - 1;

          // Scrolls graph to visible area
          var bounds = graph.getGraphBounds();

          if (bounds.width > 0 && bounds.height > 0) {
            if (
              bounds.x >
              graph.container.scrollLeft + graph.container.clientWidth * 0.9
            ) {
              graph.container.scrollLeft = Math.min(
                bounds.x + bounds.width - graph.container.clientWidth,
                bounds.x - 10
              );
            }

            if (
              bounds.y >
              graph.container.scrollTop + graph.container.clientHeight * 0.9
            ) {
              graph.container.scrollTop = Math.min(
                bounds.y + bounds.height - graph.container.clientHeight,
                bounds.y - 10
              );
            }
          }
        } else {
          var bounds = graph.getGraphBounds();
          var width = Math.max(
            bounds.width,
            graph.scrollTileSize.width * graph.view.scale
          );
          var height = Math.max(
            bounds.height,
            graph.scrollTileSize.height * graph.view.scale
          );
          graph.container.scrollTop = Math.floor(
            Math.max(
              0,
              bounds.y -
                Math.max(20, (graph.container.clientHeight - height) / 4)
            )
          );
          graph.container.scrollLeft = Math.floor(
            Math.max(
              0,
              bounds.x - Math.max(0, (graph.container.clientWidth - width) / 2)
            )
          );
        }
      } else {
        var b = mxRectangle.fromRectangle(
          graph.pageVisible
            ? graph.view.getBackgroundPageBounds()
            : graph.getGraphBounds()
        );
        var tr = graph.view.translate;
        var s = graph.view.scale;
        b.x = b.x / s - tr.x;
        b.y = b.y / s - tr.y;
        b.width /= s;
        b.height /= s;

        var dy = graph.pageVisible
          ? 0
          : Math.max(0, (graph.container.clientHeight - b.height) / 4);

        graph.view.setTranslate(
          Math.floor(
            Math.max(0, (graph.container.clientWidth - b.width) / 2) - b.x + 2
          ),
          Math.floor(dy - b.y + 1)
        );
      }
    }
  }

  /**
   * Loads the stylesheet for this graph.
   */
  setPageVisible(value) {
    var graph = this.editor.graph;
    var hasScrollbars = mxUtils.hasScrollbars(graph.container);
    var tx = 0;
    var ty = 0;

    if (hasScrollbars) {
      tx =
        graph.view.translate.x * graph.view.scale - graph.container.scrollLeft;
      ty =
        graph.view.translate.y * graph.view.scale - graph.container.scrollTop;
    }

    graph.pageVisible = value;
    graph.pageBreaksVisible = value;
    graph.preferPageSize = value;
    graph.view.validateBackground();

    // Workaround for possible handle offset
    if (hasScrollbars) {
      var cells = graph.getSelectionCells();
      graph.clearSelection();
      graph.setSelectionCells(cells);
    }

    // Calls updatePageBreaks
    graph.sizeDidChange();

    if (hasScrollbars) {
      graph.container.scrollLeft =
        graph.view.translate.x * graph.view.scale - tx;
      graph.container.scrollTop =
        graph.view.translate.y * graph.view.scale - ty;
    }

    this.fireEvent(new mxEventObject("pageViewChanged"));
  }
}
