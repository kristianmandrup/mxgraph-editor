import { AnimationSupport } from "./AnimationSupport";

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
    const { graph, doFinally } = this;

    if (graph.isEnabled()) {
      graph.getModel().beginUpdate();
      try {
        exec();
      } catch (e) {
        throw e;
      } finally {
        doFinally(animate, post);
      }
    }
  }

  doFinally(animate, post) {
    const { addAnimationSupport, noAnimationSupport } = this;
    addAnimationSupport(animate, post) || noAnimationSupport(post);
  }

  noAnimationSupport(post) {
    const { graph } = this;
    graph.getModel().endUpdate();

    if (post != null) {
      post();
    }
    return;
  }

  addAnimationSupport(animate, post) {
    return new AnimationSupport(this.ui, { animate, post }).enable();
  }
}
