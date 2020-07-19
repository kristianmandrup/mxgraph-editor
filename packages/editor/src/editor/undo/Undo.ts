import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
const { mxChildChange } = mx;

export class Undo {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  get graph() {
    return this.editor.graph;
  }

  // Keeps the selection in sync with the history
  undoHandler(_sender, evt) {
    const candidates = this.candidatesFor(evt);
    this.undoCells(candidates);
  }

  candidatesFor(evt) {
    const { graph } = this.editor;
    const { onChange } = this;
    const { changes } = evt.getProperty("edit");
    return graph.getSelectionCellsForChanges(changes, onChange);
  }

  onChange = (change) => {
    // Only selects changes to the cell hierarchy
    return !(change instanceof mxChildChange);
  };

  undoCells(candidates) {
    if (candidates.length == 0) return;
    const { graph, addCandidateCells } = this;
    // var model = graph.getModel();
    const cells = addCandidateCells(candidates);
    graph.setSelectionCells(cells);
  }

  addCandidateCells(candidates) {
    const { graph, addCell } = this;
    const cells = [];
    candidates.map((candidate) => {
      if (!graph.view.getState(candidate)) return;
      addCell(cells, candidate);
    });
    return cells;
  }

  addCell(cells, cell) {
    cells.push(cell);
  }
}
