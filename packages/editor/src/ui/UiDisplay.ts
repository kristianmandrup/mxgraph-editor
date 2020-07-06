import { ElementCreator } from "./ElementCreator";

export class UiDisplay extends ElementCreator {
  get factory() {
    return this.ui.factory;
  }

  /**
   * Creates the required containers.
   */
  createUi() {
    const { editor, ui } = this;
    const { chromeless } = editor;
    const {
      formatEnabled,
      formatContainer,
      footerContainer,
      statusContainer,
      menubar,
      menubarContainer,
      addSplitHandler,
      refresh,
    } = ui;

    // Creates menubar
    this.menubar = chromeless
      ? null
      : this.menus.createMenubar(this.createDiv("geMenubar"));

    if (this.menubar != null) {
      this.menubarContainer.appendChild(menubar.container);
    }

    // Adds status bar in menubar
    if (this.menubar != null) {
      this.statusContainer = this.createStatusContainer();

      // Connects the status bar to the editor status
      this.editor.addListener("statusChanged", () => {
        this.setStatusText(this.editor.getStatus());
      });

      this.setStatusText(this.editor.getStatus());
      this.menubar.container.appendChild(statusContainer);

      // Inserts into DOM
      this.container.appendChild(menubarContainer);
    }

    // Creates the sidebar
    this.sidebar = this.editor.chromeless
      ? null
      : this.createSidebar(this.sidebarContainer);

    if (this.sidebar != null) {
      this.container.appendChild(this.sidebarContainer);
    }

    // Creates the format sidebar
    this.format =
      chromeless || !formatEnabled ? null : this.createFormat(formatContainer);

    if (this.format != null) {
      this.container.appendChild(formatContainer);
    }

    // Creates the footer
    var footer = chromeless ? null : this.createFooter();

    if (footer != null) {
      this.footerContainer.appendChild(footer);
      this.container.appendChild(footerContainer);
    }

    if (this.sidebar != null && this.sidebarFooterContainer) {
      this.container.appendChild(this.sidebarFooterContainer);
    }

    this.container.appendChild(this.diagramContainer);

    if (this.container != null && this.tabContainer != null) {
      this.container.appendChild(this.tabContainer);
    }

    // Creates toolbar
    this.toolbar = this.editor.chromeless
      ? null
      : this.createToolbar(this.createDiv("geToolbar"));

    if (this.toolbar != null) {
      this.toolbarContainer.appendChild(this.toolbar.container);
      this.container.appendChild(this.toolbarContainer);
    }

    // HSplit
    if (this.sidebar != null) {
      this.container.appendChild(this.hsplit);

      addSplitHandler(this.hsplit, true, 0, (value) => {
        this.ui.hsplitPosition = value;
        refresh();
      });
    }
  }

  /**
   * Creates a new toolbar for the given container.
   */
  createStatusContainer() {
    var container = document.createElement("a");
    container.className = "geItem geStatus";

    if (screen.width < 420) {
      container.style.maxWidth = Math.max(20, screen.width - 320) + "px";
      container.style.overflow = "hidden";
    }

    return container;
  }

  /**
   * Creates a new toolbar for the given container.
   */
  setStatusText(value) {
    this.statusContainer.innerHTML = value;
  }

  /**
   * Creates a new toolbar for the given container.
   */
  createToolbar(container) {
    return this.factory.createToolbar(container);
    // new Toolbar(this, container);
  }

  /**
   * Creates a new sidebar for the given container.
   */
  createSidebar(container) {
    return this.factory.createSidebar(container);
    // return new Sidebar(this, container);
  }

  /**
   * Creates a new sidebar for the given container.
   */
  createFormat(container) {
    return this.factory.createFormat(container);
    // return new Format(this, container);
  }

  /**
   * Creates and returns a new footer.
   */
  createFooter() {
    return this.createDiv("geFooter");
  }
}
