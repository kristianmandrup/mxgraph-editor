import { BaseGraphXml } from "./BaseGraphXml";
import { GraphXmlGetter } from "./GraphXmlGetter";
import { GraphXmlSetter } from "./GraphXmlSetter";

export class GraphXml extends BaseGraphXml {
  graphXmlGetter: any;
  graphXmlSetter: any;

  constructor(eg) {
    super(eg);
    const { createGraphXmlGetter, createGraphXmlSetter } = this;
    this.graphXmlGetter = createGraphXmlGetter();
    this.graphXmlSetter = createGraphXmlSetter();
  }

  createGraphXmlGetter() {
    return new GraphXmlGetter(this.eg);
  }

  createGraphXmlSetter() {
    return new GraphXmlSetter(this.eg);
  }

  setGraphXml(node) {
    return this.graphXmlSetter.setGraphXml(node);
  }

  getGraphXml(ignoreSelection = true) {
    return this.graphXmlGetter.getGraphXml(ignoreSelection);
  }
}
