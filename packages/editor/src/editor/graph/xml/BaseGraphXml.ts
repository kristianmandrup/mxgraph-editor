export class BaseGraphXml {
  eg: any;
  editor: any;

  constructor(eg: any) {
    this.eg = eg;
    this.editor = eg.editor;
  }

  get graph() {
    return this.editor.graph;
  }

  fireEvent(evt) {
    this.editor.fireEvent(evt);
  }
}
