import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
const { mxUndoManager, mxEvent } = mx;

export class UndoManagerFactory {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  set undoMgr(undoMgr) {
    this.editor.undoMgr = undoMgr;
  }

  /**
   * Creates and returns a new undo manager.
   */
  createUndoManager() {
    const { undoHandler, undoMgr, graph, listener } = this.editor;
    this.undoMgr = new mxUndoManager(200);

    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);

    undoMgr.addListener(mxEvent.UNDO, undoHandler);
    undoMgr.addListener(mxEvent.REDO, undoHandler);

    return undoMgr;
  }
}
