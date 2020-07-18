import mx from "@mxgraph-app/mx";
const { mxMorphing, mxEvent } = mx;

export class AnimationSupport {
  ui: any;
  editor: any;
  graph: any;
  animate: boolean;
  post: any;
  morph: any;

  constructor(ui, { animate, post }) {
    this.ui = ui;
    this.editor = ui.editor;
    this.graph = ui.graph;
    this.animate = animate;
    this.post = post;
  }

  get shouldAnimate() {
    const { allowAnimation, animate } = this.ui;
    return (
      allowAnimation &&
      animate &&
      (navigator.userAgent == null || navigator.userAgent.indexOf("Camino") < 0)
    );
  }

  enable() {
    const { shouldAnimate, createMorphing, addMorphListener } = this;
    // Animates the changes in the graph model except
    // for Camino, where animation is too slow
    if (!shouldAnimate) return;
    // New API for animating graph layout results asynchronously
    const morph = createMorphing();
    addMorphListener(morph);
    morph.startAnimation();
    return true;
  }

  createMorphing() {
    const { graph } = this;
    var morph = new mxMorphing(graph);
    this.morph = morph;
    return morph;
  }

  addMorphListener(morph) {
    const { graph, post } = this;
    morph.addListener(mxEvent.DONE, () => {
      graph.getModel().endUpdate();

      if (post != null) {
        post();
      }
    });
    return morph;
  }
}
