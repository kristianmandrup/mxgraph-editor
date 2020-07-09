import mx from "@mxgraph-app/mx";
const { mxRectangle } = mx;

export class NoScrollbars {
  graph: any;
  editor: any;
  bounds: any;

  constructor(editor: any) {
    this.editor = editor;
    this.graph = editor.graph;
  }

  setRectangleBounds() {
    this.bounds = this.rectangleBounds;
    return this.bounds;
  }

  get rectangleBounds() {
    const { rawRectangleBounds, calculateRectBounds } = this;
    return calculateRectBounds(rawRectangleBounds);
  }

  get rawRectangleBounds() {
    const { graph } = this;
    return mxRectangle.fromRectangle(
      graph.pageVisible
        ? graph.view.getBackgroundPageBounds()
        : graph.getGraphBounds()
    );
  }

  get container() {
    return this.graph.container;
  }

  calculateRectBounds(b) {
    const { graph } = this;
    var tr = graph.view.translate;
    var s = graph.view.scale;
    b.x = b.x / s - tr.x;
    b.y = b.y / s - tr.y;
    b.width /= s;
    b.height /= s;
    return b;
  }

  get dy() {
    const { graph, container, bounds } = this;
    return graph.pageVisible
      ? 0
      : Math.max(0, (container.clientHeight - bounds.height) / 4);
  }

  get translatedX() {
    const { container, bounds } = this;
    const { width, x } = bounds;
    return Math.floor(Math.max(0, (container.clientWidth - width) / 2) - x + 2);
  }

  get translateY() {
    const { dy, bounds } = this;
    return Math.floor(dy - bounds.y + 1);
  }

  apply() {
    const { graph, setRectangleBounds } = this;
    setRectangleBounds();
    const { translatedX, translateY } = this;
    graph.view.setTranslate(translatedX, translateY);
    return true;
  }
}
