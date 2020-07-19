import { ElementCreator } from "./ElementCreator";

export class UiDisplay extends ElementCreator {
  get factory() {
    return this.ui.factory;
  }

  get formatEnabled() {
    return this.ui.formatEnabled;
  }

  get formatContainer() {
    return this.ui.formatContainer;
  }

  get chromeless() {
    return this.editor.chromeless;
  }

  setMenubar() {
    // Creates menubar
    this.menubar = this.chromeless && this.createMenuBar();
  }

  createMenuBar() {
    return this.menus.createMenubar(this.createDiv("geMenubar"));
  }

  // Creates the sidebar
  setSidebar() {
    this.sidebar = this.chromeless && this.createSidebar(this.sidebarContainer);
  }

  // Creates the format sidebar
  setFormatSidebar() {
    const { formatEnabled, formatContainer, chromeless } = this;
    this.format =
      (chromeless || !formatEnabled) && this.createFormat(formatContainer);
  }

  setToolbar() {
    // Creates toolbar
    this.toolbar =
      this.editor.chromeless && this.createToolbar(this.createDiv("geToolbar"));
  }

  /**
   * Creates the required containers.
   */
  createUi() {
    const {
      appendMenubar,
      appendSidebar,
      appendFormatSidebar,
      appendFooter,
      appendSideFooterContainer,
      appendTabContainer,
      appendToolbar,
      appendHSplit,
      appendDiagram,
    } = this;

    appendMenubar();
    appendSidebar();
    appendFormatSidebar();
    appendFooter();
    appendDiagram();
    appendSideFooterContainer();
    appendTabContainer();
    appendToolbar();
    appendHSplit();
  }

  appendDiagram() {
    const { diagramContainer, container } = this;
    container.appendChild(diagramContainer);
  }

  appendFormatSidebar() {
    const { setFormatSidebar, format, container } = this;
    setFormatSidebar();

    const { formatContainer } = this.ui;
    if (format) {
      container.appendChild(formatContainer);
    }
  }

  appendSidebar() {
    const { container, sidebarContainer, sidebar, setSidebar } = this;
    setSidebar();
    if (sidebar) {
      container.appendChild(sidebarContainer);
    }
  }

  appendMenubar() {
    const { menubarContainer, menubar, setMenubar, appendStatusbar } = this;
    setMenubar();
    if (menubar) {
      menubarContainer.appendChild(menubar.container);
    }
    appendStatusbar();
  }

  appendStatusbar() {
    const {
      container,
      editor,
      menubar,
      statusContainer,
      menubarContainer,
      setStatusText,
      createStatusContainer,
    } = this;

    // Adds status bar in menubar
    if (!menubar) return;
    this.statusContainer = createStatusContainer();

    // Connects the status bar to the editor status
    editor.addListener("statusChanged", () => {
      setStatusText(editor.getStatus());
    });

    setStatusText(editor.getStatus());
    menubar.container.appendChild(statusContainer);

    // Inserts into DOM
    container.appendChild(menubarContainer);
  }

  setFooter() {
    const { chromeless } = this;
    // Creates the footer
    this.footer = chromeless && this.createFooter();
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
    const { container, sidebar, sidebarFooterContainer } = this;
    if (sidebar && sidebar) {
      container.appendChild(sidebarFooterContainer);
    }
  }

  appendTabContainer() {
    const { container, tabContainer } = this;
    if (container && tabContainer) {
      container.appendChild(tabContainer);
    }
  }

  appendToolbar() {
    const { setToolbar, container, toolbar, toolbarContainer } = this;
    setToolbar();

    if (toolbar) {
      toolbarContainer.appendChild(toolbar.container);
      container.appendChild(toolbarContainer);
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
