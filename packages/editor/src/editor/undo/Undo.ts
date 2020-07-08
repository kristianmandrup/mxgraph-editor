import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
const { mxChildChange } = mx;

export class Undo {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  // Keeps the selection in sync with the history
  undoHandler(_sender, evt) {
    const candidates = this.candidatesFor(evt);
    this.undoCells(candidates);
  }

  candidatesFor(evt) {
    const { graph } = this.editor;
    const onChange = (change) => {
      // Only selects changes to the cell hierarchy
      return !(change instanceof mxChildChange);
    };
    const { changes } = evt.getProperty("edit");
    return graph.getSelectionCellsForChanges(changes, onChange);
  }

  undoCells(candidates) {
    if (candidates.length == 0) return;
    const { graph } = this.editor;
    // var model = graph.getModel();
    var cells = [];

    for (var i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      if (graph.view.getState(candidate) != null) {
        this.addCell(cells, candidate);
      }
    }
    graph.setSelectionCells(cells);
  }

  addCell(cells, cell) {
    cells.push(cell);
  }
}
