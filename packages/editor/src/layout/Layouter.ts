import mx from "@mxgraph-app/mx";
const { mxMorphing, mxEvent } = mx;

export class Layouter {
  ui: any;
  editor: any;
  graph: any;

  constructor(ui) {
    this.ui = ui;
    this.editor = ui.editor;
    this.graph = ui.graph;
  }

  /**
   * Executes the given layout.
   */
  executeLayout(exec, animate, post) {
    const { graph } = this;
    const { allowAnimation } = this.ui;

    if (graph.isEnabled()) {
      graph.getModel().beginUpdate();
      try {
        exec();
      } catch (e) {
        throw e;
      } finally {
        // Animates the changes in the graph model except
        // for Camino, where animation is too slow
        if (
          allowAnimation &&
          animate &&
          (navigator.userAgent == null ||
            navigator.userAgent.indexOf("Camino") < 0)
        ) {
          // New API for animating graph layout results asynchronously
          var morph = new mxMorphing(graph);
          morph.addListener(mxEvent.DONE, () => {
            graph.getModel().endUpdate();

            if (post != null) {
              post();
            }
          });

          morph.startAnimation();
        } else {
          graph.getModel().endUpdate();

          if (post != null) {
            post();
          }
        }
      }
    }
  }
}
