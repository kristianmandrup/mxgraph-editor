// import { MenuManager } from "@mxgraph-app/menus";
// import { Toolbar } from "@mxgraph-app/toolbar";
// import { Sidebar } from "@mxgraph-app/sidebar";
// import { Format } from "@mxgraph-app/format";

export class Factory {
  /**
   * "Installs" menus in EditorUi.
   */
  createMenus(): any {
    return {}; // new MenuManager(this);
  }

  /**
   * Creates a new toolbar for the given container.
   */
  createToolbar(_container): any {
    return {}; // new Toolbar(this, container);
  }

  /**
   * Creates a new sidebar for the given container.
   */
  createSidebar(_container): any {
    return {}; // new Sidebar(this, container);
  }

  /**
   * Creates a new sidebar for the given container.
   */
  createFormat(_container) {
    return {}; // new Format(this, container);
  }
}
