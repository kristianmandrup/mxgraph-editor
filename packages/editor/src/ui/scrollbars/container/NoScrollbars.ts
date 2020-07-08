import mx from "@mxgraph-app/mx";
const { mxRectangle } = mx;

export class NoScrollbars {
  graph: any;
  editor: any;

  constructor(editor: any) {
    this.editor = editor;
    this.graph = editor.graph;
  }

  apply() {
    const { graph } = this;
    var b = mxRectangle.fromRectangle(
      graph.pageVisible
        ? graph.view.getBackgroundPageBounds()
        : graph.getGraphBounds()
    );
    var tr = graph.view.translate;
    var s = graph.view.scale;
    b.x = b.x / s - tr.x;
    b.y = b.y / s - tr.y;
    b.width /= s;
    b.height /= s;

    var dy = graph.pageVisible
      ? 0
      : Math.max(0, (graph.container.clientHeight - b.height) / 4);

    graph.view.setTranslate(
      Math.floor(
        Math.max(0, (graph.container.clientWidth - b.width) / 2) - b.x + 2
      ),
      Math.floor(dy - b.y + 1)
    );
    return true;
  }
}
