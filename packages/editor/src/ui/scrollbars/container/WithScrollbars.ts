import mx from "@mxgraph-app/mx";
import { VisiblePage, InvisiblePage } from "./page";
const { mxUtils } = mx;

export class WithScrollbars {
  graph: any;
  editor: any;

  visiblePage: VisiblePage;
  invisiblePage: InvisiblePage;

  constructor(editor: any) {
    this.editor = editor;
    this.graph = editor.graph;
    this.visiblePage = new VisiblePage(editor);
    this.invisiblePage = new InvisiblePage(editor);
  }

  apply() {
    const { graph, visible, invisible } = this;
    if (!mxUtils.hasScrollbars(graph.container)) return false;
    visible() || invisible();

    return true;
  }

  visible() {
    return this.visiblePage.apply();
  }

  invisible() {
    return this.visiblePage.apply();
  }
}
