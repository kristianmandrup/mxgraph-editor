import mx from "@mxgraph-app/mx";
const { mxMorphing, mxEvent } = mx;

export class AnimationSupport {
  ui: any;
  editor: any;
  graph: any;
  animate: boolean;
  post: any;

  constructor(ui, { animate, post }) {
    this.ui = ui;
    this.editor = ui.editor;
    this.graph = ui.graph;
    this.animate = animate;
    this.post = post;
  }

  shouldAnimate(animate) {
    const { allowAnimation } = this.ui;
    return (
      allowAnimation &&
      animate &&
      (navigator.userAgent == null || navigator.userAgent.indexOf("Camino") < 0)
    );
  }

  enable() {
    const { graph, shouldAnimate, animate, post } = this;
    // Animates the changes in the graph model except
    // for Camino, where animation is too slow
    if (!shouldAnimate(animate)) return;
    // New API for animating graph layout results asynchronously
    var morph = new mxMorphing(graph);
    morph.addListener(mxEvent.DONE, () => {
      graph.getModel().endUpdate();

      if (post != null) {
        post();
      }
    });

    morph.startAnimation();
    return true;
  }
}
