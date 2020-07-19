import { ElementCreator } from "./ElementCreator";

export class UiDisplay extends ElementCreator {
  get factory() {
    return this.ui.factory;
  }

  get chromeless() {
    return this.editor.chromeless;
  }

  setMenubar() {
    // Creates menubar
    this.menubar = this.chromeless
      ? null
      : this.menus.createMenubar(this.createDiv("geMenubar"));
  }

  setSidebar() {
    // Creates the sidebar
    this.sidebar = this.editor.chromeless
      ? null
      : this.createSidebar(this.sidebarContainer);
  }

  setFormatSidebar() {
    const { chromeless, ui } = this;
    const { formatEnabled, formatContainer } = ui;
    // Creates the format sidebar
    this.format =
      chromeless || !formatEnabled ? null : this.createFormat(formatContainer);
  }

  /**
   * Creates the required containers.
   */
  createUi() {
    const {
      setMenubar,
      appendMenubar,
      setSidebar,
      appendSidebar,
      setFormatSidebar,
      appendFormatSidebar,
      setFooter,
      setToolbar,
      appendSideFooterContainer,
      appendTabContainer,
      appendToolbar,
      appendHSplit,
      appendDiagram,
    } = this;

    setMenubar();
    appendMenubar();

    setSidebar();
    appendSidebar();

    setFormatSidebar();
    appendFormatSidebar();

    setFooter();

    appendDiagram();

    appendSideFooterContainer();
    appendTabContainer();

    setToolbar();
    appendToolbar();
    appendHSplit();
  }

  setToolbar() {
    // Creates toolbar
    this.toolbar = this.editor.chromeless
      ? null
      : this.createToolbar(this.createDiv("geToolbar"));
  }

  appendDiagram() {
    this.container.appendChild(this.diagramContainer);
  }

  appendFormatSidebar() {
    const { formatContainer } = this.ui;
    if (this.format) {
      this.container.appendChild(formatContainer);
    }
  }

  appendSidebar() {
    if (this.sidebar) {
      this.container.appendChild(this.sidebarContainer);
    }
  }

  appendMenubar() {
    if (this.menubar) {
      this.menubarContainer.appendChild(this.menubar.container);
    }
    this.appendStatusbar();
  }

  appendStatusbar() {
    const { statusContainer, menubarContainer } = this.ui;
    // Adds status bar in menubar
    if (this.menubar) {
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
  }

  setFooter() {
    const { chromeless } = this;
    // Creates the footer
    this.footer = chromeless ? null : this.createFooter();
  }

  appendFooter() {
    const { footer, ui } = this;
    const { footerContainer } = ui;
    if (footer) {
      this.footerContainer.appendChild(footer);
      this.container.appendChild(footerContainer);
    }
  }

  appendSideFooterContainer() {
    if (this.sidebar && this.sidebarFooterContainer) {
      this.container.appendChild(this.sidebarFooterContainer);
    }
  }

  appendTabContainer() {
    if (this.container && this.tabContainer) {
      this.container.appendChild(this.tabContainer);
    }
  }

  appendToolbar() {
    if (this.toolbar) {
      this.toolbarContainer.appendChild(this.toolbar.container);
      this.container.appendChild(this.toolbarContainer);
    }
  }

  appendHSplit() {
    const { ui, hsplit, sidebar, container } = this;
    const { addSplitHandler, refresh } = ui;

    // HSplit
    if (sidebar) {
      container.appendChild(hsplit);

      addSplitHandler(hsplit, true, 0, (value) => {
        ui.hsplitPosition = value;
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
