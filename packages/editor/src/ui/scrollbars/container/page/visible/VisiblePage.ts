import { VisibleScroller } from "./VisibleScroller";

export class VisiblePage {
  editor: any;
  graph: any;

  visibleScroller: VisibleScroller;

  constructor(editor: any) {
    this.editor = editor;
    this.graph = editor.graph;
    this.visibleScroller = new VisibleScroller(editor);
  }

  get bounds() {
    return this.graph.getGraphBounds();
  }

  get pad() {
    return this.graph.getPagePadding();
  }

  get scrollTop() {
    const { pad, editor } = this;
    return Math.floor(pad.y - editor.initialTopSpacing) - 1;
  }

  get scrollLeft() {
    const { pad, graph } = this;
    return (
      Math.floor(
        Math.min(
          pad.x,
          (graph.container.scrollWidth - graph.container.clientWidth) / 2
        )
      ) - 1
    );
  }

  apply() {
    const { graph, scrollTop, scrollLeft } = this;
    if (!graph.pageVisible) return;
    graph.container.scrollTop = scrollTop;
    graph.container.scrollLeft = scrollLeft;

    this.visibleScroller.scroll();
    return true;
  }
}
