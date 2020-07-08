export class InvisiblePage {
  editor: any;
  graph: any;

  constructor(editor: any) {
    this.editor = editor;
    this.graph = editor.graph;
  }

  get bounds() {
    return this.graph.getGraphBounds();
  }

  get width() {
    const { graph, bounds } = this;
    return Math.max(
      bounds.width,
      graph.scrollTileSize.width * graph.view.scale
    );
  }

  get height() {
    const { graph, bounds } = this;
    return Math.max(
      bounds.height,
      graph.scrollTileSize.height * graph.view.scale
    );
  }

  get scrollTop() {
    const { graph, bounds, height } = this;
    return Math.floor(
      Math.max(
        0,
        bounds.y - Math.max(20, (graph.container.clientHeight - height) / 4)
      )
    );
  }

  get scrollLeft() {
    const { graph, bounds, width } = this;
    return Math.floor(
      Math.max(
        0,
        bounds.x - Math.max(0, (graph.container.clientWidth - width) / 2)
      )
    );
  }

  apply() {
    const { graph, scrollLeft, scrollTop } = this;
    graph.container.scrollTop = scrollTop;
    graph.container.scrollLeft = scrollLeft;
  }
}
