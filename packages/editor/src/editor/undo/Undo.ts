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
    const { graph } = this.editor;
    var cand = graph.getSelectionCellsForChanges(
      evt.getProperty("edit").changes,
      function (change) {
        // Only selects changes to the cell hierarchy
        return !(change instanceof mxChildChange);
      }
    );

    if (cand.length > 0) {
      // var model = graph.getModel();
      var cells = [];

      for (var i = 0; i < cand.length; i++) {
        const candidate = cand[i];
        if (graph.view.getState(candidate) != null) {
          this.addCell(cells, candidate);
        }
      }
      graph.setSelectionCells(cells);
    }
  }

  addCell(cells, cell) {
    cells.push(cell);
  }
}
