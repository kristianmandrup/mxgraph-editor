import { BaseGraphXml } from "./BaseGraphXml";
import { GraphXmlGetter } from "./GraphXmlGetter";
import { GraphXmlSetter } from "./GraphXmlSetter";

export class GraphXml extends BaseGraphXml {
  graphXmlGetter: any;
  graphXmlSetter: any;

  constructor(eg) {
    super(eg, eg.editor);
    const { createGraphXmlGetter, createGraphXmlSetter } = this;
    this.graphXmlGetter = createGraphXmlGetter();
    this.graphXmlSetter = createGraphXmlSetter();
  }

  createGraphXmlGetter() {
    return new GraphXmlGetter(this.eg, this.editor);
  }

  createGraphXmlSetter() {
    return new GraphXmlSetter(this.eg, this.editor);
  }

  setGraphXml(node) {
    return this.graphXmlSetter.setGraphXml(node);
  }

  getGraphXml(node) {
    return this.graphXmlGetter.getGraphXml(node);
  }
}
