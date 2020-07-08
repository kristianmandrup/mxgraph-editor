import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
const { mxUndoManager, mxEvent } = mx;

export class UndoManagerFactory {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
    this.undoMgr = this.createUndoManagerInstance();
  }

  set undoMgr(undoMgr) {
    this.editor.undoMgr = undoMgr;
  }

  createUndoManagerInstance() {
    return new mxUndoManager(200);
  }

  get graph() {
    return this.editor.graph;
  }

  get model() {
    return this.graph.getModel();
  }

  get view() {
    return this.graph.getView();
  }
  /**
   * Creates and returns a new undo manager.
   */
  createUndoManager() {
    const { addUndoListeners, addRedoListeners } = this;
    addUndoListeners();
    addRedoListeners();
    return this.undoMgr;
  }

  addUndoListeners() {
    const { undoHandler, undoMgr, listener } = this.editor;
    const { view, model } = this;
    model.addListener(mxEvent.UNDO, listener);
    view.addListener(mxEvent.UNDO, listener);
    undoMgr.addListener(mxEvent.UNDO, undoHandler);
  }

  addRedoListeners() {
    const { undoHandler, undoMgr } = this.editor;
    undoMgr.addListener(mxEvent.REDO, undoHandler);
  }
}
