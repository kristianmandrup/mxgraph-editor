import mx from "@mxgraph-app/mx";
const { mxUtils, mxEventObject, mxRectangle } = mx;

export class ScrollbarsManager {
  ui: any;
  editor: any;
  actions: any;

  constructor(ui) {
    this.ui = ui;
    this.editor = ui.editor;
  }

  fireEvent(evt) {
    return this.editor.fireEvent(evt);
  }

  get graph() {
    return this.editor.graph;
  }

  /**
   * Specifies if the graph has scrollbars.
   */
  setScrollbars(value) {
    var graph = this.editor.graph;
    var prev = graph.container.style.overflow;
    graph.scrollbars = value;
    this.editor.updateGraphComponents();

    if (prev != graph.container.style.overflow) {
      graph.container.scrollTop = 0;
      graph.container.scrollLeft = 0;
      graph.view.scaleAndTranslate(1, 0, 0);
      this.resetScrollbars();
    }

    this.fireEvent(new mxEventObject("scrollbarsChanged"));
  }

  /**
   * Returns true if the graph has scrollbars.
   */
  hasScrollbars() {
    return this.editor.graph.scrollbars;
  }

  /**
   * Resets the state of the scrollbars.
   */
  resetScrollbars() {
    var graph = this.editor.graph;

    if (!this.editor.extendCanvas) {
      graph.container.scrollTop = 0;
      graph.container.scrollLeft = 0;

      if (!mxUtils.hasScrollbars(graph.container)) {
        graph.view.setTranslate(0, 0);
      }
    } else if (!this.editor.isChromelessView()) {
      if (mxUtils.hasScrollbars(graph.container)) {
        if (graph.pageVisible) {
          var pad = graph.getPagePadding();
          graph.container.scrollTop =
            Math.floor(pad.y - this.editor.initialTopSpacing) - 1;
          graph.container.scrollLeft =
            Math.floor(
              Math.min(
                pad.x,
                (graph.container.scrollWidth - graph.container.clientWidth) / 2
              )
            ) - 1;

          // Scrolls graph to visible area
          var bounds = graph.getGraphBounds();

          if (bounds.width > 0 && bounds.height > 0) {
            if (
              bounds.x >
              graph.container.scrollLeft + graph.container.clientWidth * 0.9
            ) {
              graph.container.scrollLeft = Math.min(
                bounds.x + bounds.width - graph.container.clientWidth,
                bounds.x - 10
              );
            }

            if (
              bounds.y >
              graph.container.scrollTop + graph.container.clientHeight * 0.9
            ) {
              graph.container.scrollTop = Math.min(
                bounds.y + bounds.height - graph.container.clientHeight,
                bounds.y - 10
              );
            }
          }
        } else {
          var bounds = graph.getGraphBounds();
          var width = Math.max(
            bounds.width,
            graph.scrollTileSize.width * graph.view.scale
          );
          var height = Math.max(
            bounds.height,
            graph.scrollTileSize.height * graph.view.scale
          );
          graph.container.scrollTop = Math.floor(
            Math.max(
              0,
              bounds.y -
                Math.max(20, (graph.container.clientHeight - height) / 4)
            )
          );
          graph.container.scrollLeft = Math.floor(
            Math.max(
              0,
              bounds.x - Math.max(0, (graph.container.clientWidth - width) / 2)
            )
          );
        }
      } else {
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
      }
    }
  }
}
