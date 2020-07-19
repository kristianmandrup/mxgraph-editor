import mx from "@mxgraph-app/mx";
const { mxEvent } = mx;

export class Destroyer {
  editorUi: any;

  constructor(editorUi: any) {
    this.editorUi = editorUi;
  }

  get editor() {
    return this.editorUi.editor;
  }

  destroyEditor() {
    const { editorUi } = this;
    const { editor } = editorUi;
    if (editor) {
      editor.destroy();
      editorUi.editor = null;
    }
  }

  destroyMenubar() {
    const { editorUi } = this;
    const { menubar } = editorUi;
    if (menubar) {
      menubar.destroy();
      editorUi.menubar = null;
    }
  }

  destroyToolbar() {
    const { editorUi } = this;
    const { toolbar } = editorUi;
    if (toolbar) {
      toolbar.destroy();
      editorUi.toolbar = null;
    }
  }

  destroySidebar() {
    const { editorUi } = this;
    const { sidebar } = editorUi;
    if (sidebar) {
      sidebar.destroy();
      editorUi.sidebar = null;
    }
  }

  destroyHandlers() {
    const {
      destroyKeyHandler,
      destroyKeydownHandler,
      destroyKeyupHandler,
      destroyResizeHandler,
      destroyGestureHandler,
      destroyOrientationChangeHandler,
      destroyScrollHandler,
    } = this;
    destroyKeyHandler();
    destroyKeydownHandler();
    destroyKeyupHandler();
    destroyResizeHandler();
    destroyGestureHandler();
    destroyOrientationChangeHandler();
    destroyScrollHandler();
  }

  destroyKeyHandler() {
    const { editorUi } = this;
    const { keyHandler } = editorUi;

    if (keyHandler) {
      keyHandler.destroy();
      editorUi.editorUi.keyHandler = null;
    }
  }

  destroyKeydownHandler() {
    const { editorUi } = this;
    const { keydownHandler } = editorUi;

    if (keydownHandler) {
      mxEvent.removeListener(document, "keydown", keydownHandler);
      editorUi.keydownHandler = null;
    }
  }

  destroyKeyupHandler() {
    const { editorUi } = this;
    const { keyupHandler } = editorUi;

    if (keyupHandler) {
      mxEvent.removeListener(document, "keyup", keyupHandler);
      editorUi.keyupHandler = null;
    }
  }

  destroyResizeHandler() {
    const { editorUi } = this;
    const { resizeHandler } = editorUi;

    if (resizeHandler) {
      mxEvent.removeListener(window, "resize", resizeHandler);
      editorUi.resizeHandler = null;
    }
  }

  destroyGestureHandler() {
    const { editorUi } = this;
    const { gestureHandler } = editorUi;

    if (gestureHandler) {
      mxEvent.removeGestureListeners(document, gestureHandler, null, null);
      editorUi.gestureHandler = null;
    }
  }

  destroyOrientationChangeHandler() {
    const { editorUi } = this;
    const { orientationChangeHandler } = editorUi;

    if (orientationChangeHandler) {
      mxEvent.removeListener(
        window,
        "orientationchange",
        orientationChangeHandler
      );
      editorUi.orientationChangeHandler = null;
    }
  }

  destroyScrollHandler() {
    const { editorUi } = this;
    const { scrollHandler } = editorUi;

    if (scrollHandler) {
      mxEvent.removeListener(window, "scroll", scrollHandler);
      editorUi.scrollHandler = null;
    }
  }

  destroyEditorFunctions() {
    const { editorUi } = this;
    const { destroyFunctions } = editorUi;

    if (destroyFunctions) {
      for (var i = 0; i < destroyFunctions.length; i++) {
        destroyFunctions[i]();
      }

      editorUi.destroyFunctions = null;
    }
  }

  removeDomElements() {
    const {
      menubarContainer,
      toolbarContainer,
      sidebarContainer,
      formatContainer,
      diagramContainer,
      footerContainer,
      chromelessToolbar,
      hsplit,
      sidebarFooterContainer,
      layersDialog,
    } = this.editorUi;

    const c = [
      menubarContainer,
      toolbarContainer,
      sidebarContainer,
      formatContainer,
      diagramContainer,
      footerContainer,
      chromelessToolbar,
      hsplit,
      sidebarFooterContainer,
      layersDialog,
    ];

    for (var i = 0; i < c.length; i++) {
      if (c[i] && c[i].parentNode) {
        c[i].parentNode.removeChild(c[i]);
      }
    }
  }

  /**
   * Creates the keyboard event handler for the current graph and history.
   */
  destroy() {
    const {
      destroyEditor,
      destroyMenubar,
      destroyToolbar,
      destroySidebar,
      destroyHandlers,
      destroyEditorFunctions,
      removeDomElements,
    } = this;

    destroyEditor();
    destroyMenubar();
    destroyToolbar();
    destroySidebar();
    destroyHandlers();
    destroyEditorFunctions();
    removeDomElements();
  }
}
