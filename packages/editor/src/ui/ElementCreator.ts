import mx from "@mxgraph-app/mx";
const { mxPopupMenu, mxResources } = mx;

export class ElementCreator {
  ui: any;

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

  editor: any;

  constructor(ui) {
    this.ui = ui;
    this.editor = ui.editor;
  }

  /**
   * Creates the required containers.
   */
  createDivs() {
    const { formatWidth, splitSize, editor } = this.ui;

    this.menubarContainer = this.createDiv("geMenubarContainer");
    this.toolbarContainer = this.createDiv("geToolbarContainer");
    this.sidebarContainer = this.createDiv("geSidebarContainer");
    this.formatContainer = this.createDiv(
      "geSidebarContainer geFormatContainer"
    );
    this.diagramContainer = this.createDiv("geDiagramContainer");
    this.footerContainer = this.createDiv("geFooterContainer");
    this.hsplit = this.createDiv("geHsplit");
    this.hsplit.setAttribute("title", mxResources.get("collapseExpand"));

    // Sets static style for containers
    this.menubarContainer.style.top = "0px";
    this.menubarContainer.style.left = "0px";
    this.menubarContainer.style.right = "0px";
    this.toolbarContainer.style.left = "0px";
    this.toolbarContainer.style.right = "0px";
    this.sidebarContainer.style.left = "0px";
    this.formatContainer.style.right = "0px";
    this.formatContainer.style.zIndex = "1";
    this.diagramContainer.style.right =
      (this.format != null ? formatWidth : 0) + "px";
    this.footerContainer.style.left = "0px";
    this.footerContainer.style.right = "0px";
    this.footerContainer.style.bottom = "0px";
    this.footerContainer.style.zIndex = mxPopupMenu.prototype.zIndex - 2;
    this.hsplit.style.width = splitSize + "px";
    this.sidebarFooterContainer = this.createSidebarFooterContainer();

    if (this.sidebarFooterContainer) {
      this.sidebarFooterContainer.style.left = "0px";
    }

    if (!editor.chromeless) {
      this.tabContainer = this.createTabContainer();
    } else {
      this.diagramContainer.style.border = "none";
    }
  }

  /**
   * Creates the required containers.
   */
  createTabContainer() {
    return null;
  }

  /**
   * Hook for sidebar footer container. This implementation returns null.
   */
  createSidebarFooterContainer() {
    return null;
  }

  /**
   * Creates the actual toolbar for the toolbar container.
   */
  createDiv(classname) {
    var elt = document.createElement("div");
    elt.className = classname;

    return elt;
  }
}
