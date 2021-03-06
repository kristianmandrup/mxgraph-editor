import mx from "@mxgraph-app/mx";
const { mxEvent } = mx;

export class UndoRedo {
  ui: any;
  editor: any;
  actions: any;

  constructor(ui) {
    this.ui = ui;
    this.editor = ui.editor;
    this.actions = ui.actions;
  }

  get graph() {
    return this.editor.graph;
  }

  get isEditing() {
    return this.graph.isEditing();
  }

  get undoManager() {
    return this.editor.undoManager;
  }

  /**
   * Returns the URL for a copy of this editor with no state.
   */
  canRedo() {
    return this.graph.isEditing() || this.editor.undoManager.canRedo();
  }

  /**
   * Returns the URL for a copy of this editor with no state.
   */
  canUndo() {
    return this.graph.isEditing() || this.editor.undoManager.canUndo();
  }

  /**
   * Updates the states of the given undo/redo items.
   */
  addUndoListener() {
    const undoListener = this.configureUndoListener();

    this.setStartEditing(undoListener);
    this.setStopEditing(undoListener);

    // Updates the button states once
    undoListener();
  }

  setStartEditing(undoListener) {
    // Overrides cell editor to update action states
    var cellEditorStartEditing = this.editor.graph.cellEditor.startEditing;

    this.editor.graph.cellEditor.startEditing = () => {
      cellEditorStartEditing.apply(this, arguments);
      undoListener();
    };
  }

  setStopEditing(undoListener) {
    var cellEditorStopEditing = this.editor.graph.cellEditor.stopEditing;

    this.editor.graph.cellEditor.stopEditing = (_cell, _trigger) => {
      cellEditorStopEditing.apply(this, arguments);
      undoListener();
    };
  }

  actionFor(name) {
    return this.actions.get(name);
  }

  get undo() {
    return this.actionFor("undo");
  }

  get redo() {
    return this.actionFor("redo");
  }

  configureUndoListener() {
    var undoMgr = this.editor.undoManager;
    const { undoListener } = this;
    undoMgr.addListener(mxEvent.ADD, undoListener);
    undoMgr.addListener(mxEvent.UNDO, undoListener);
    undoMgr.addListener(mxEvent.REDO, undoListener);
    undoMgr.addListener(mxEvent.CLEAR, undoListener);
    return undoListener;
  }

  undoListener = () => {
    const { undo, redo } = this;
    undo.setEnabled(this.canUndo());
    redo.setEnabled(this.canRedo());
  };
}
