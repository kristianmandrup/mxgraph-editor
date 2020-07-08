export class VisibleScroller {
  editor: any;
  graph: any;

  constructor(editor: any) {
    this.editor = editor;
    this.graph = editor.graph;
  }

  get bounds() {
    return this.graph.getGraphBounds();
  }

  get scrollTop() {
    const { bounds, graph } = this;
    return Math.min(
      bounds.y + bounds.height - graph.container.clientHeight,
      bounds.y - 10
    );
  }

  get scrollLeft() {
    const { bounds, graph } = this;
    return Math.min(
      bounds.x + bounds.width - graph.container.clientWidth,
      bounds.x - 10
    );
  }

  get shouldScrollLeft() {
    const { bounds, graph } = this;
    return (
      bounds.x > graph.container.scrollLeft + graph.container.clientWidth * 0.9
    );
  }

  get shouldScrollTop() {
    const { bounds, graph } = this;
    return (
      bounds.y > graph.container.scrollTop + graph.container.clientHeight * 0.9
    );
  }

  get shouldScroll() {
    const { bounds } = this;
    return bounds.width > 0 && bounds.height > 0;
  }

  scroll() {
    const { doScroll, shouldScroll } = this;
    // Scrolls graph to visible area
    if (!shouldScroll) return;
    doScroll();
  }

  doScroll() {
    const {
      graph,
      scrollTop,
      scrollLeft,
      shouldScrollLeft,
      shouldScrollTop,
    } = this;

    if (shouldScrollLeft) {
      graph.container.scrollLeft = scrollLeft;
    }

    if (shouldScrollTop) {
      graph.container.scrollTop = scrollTop;
    }
  }
}
