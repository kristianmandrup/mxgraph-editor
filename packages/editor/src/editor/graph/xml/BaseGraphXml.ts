export class BaseGraphXml {
  eg: any;
  editor: any;

  constructor(eg: any, editor: any) {
    this.eg = eg;
    this.editor = editor;
  }

  get graph() {
    return this.editor.graph;
  }

  fireEvent(evt) {
    this.editor.fireEvent(evt);
  }
}
