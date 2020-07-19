import mx from "@mxgraph-app/mx";
const { mxRectangle, mxGraph } = mx;

export class PageConfig {
  stateReader: any;

  constructor(stateReader: any) {
    this.stateReader = stateReader;
  }

  get graph() {
    return this.stateReader.graph;
  }

  get node() {
    return this.stateReader.node;
  }

  get nodePageScale() {
    return parseFloat(this.node.getAttribute("pageScale"));
  }

  get pageScale() {
    const { nodePageScale } = this;
    return !isNaN(nodePageScale) && nodePageScale > 0
      ? nodePageScale
      : mxGraph.prototype.pageScale;
  }

  setPageScale() {
    this.graph.pageScale = this.pageScale;
    return this;
  }

  get pageVisible() {
    const { isPageViewer, graph, page } = this;
    if (!isPageViewer) return false;
    return page ? page != "0" : graph.defaultPageVisible;
  }

  setPageVisibility() {
    this.graph.pageVisible = this.pageVisible;
    return this;
  }

  get isPageViewer() {
    const { graph } = this;
    return !graph.isLightboxView() && !graph.isViewer();
  }

  get page() {
    return this.node.getAttribute("page");
  }

  get pageWidth() {
    return parseFloat(this.node.getAttribute("pageWidth"));
  }

  get pageHeight() {
    return parseFloat(this.node.getAttribute("pageHeight"));
  }

  get hasPageSize() {
    const { pageWidth, pageHeight } = this;
    return !isNaN(pageWidth) && !isNaN(pageHeight);
  }

  get pageFormat() {
    const { hasPageSize, pageWidth, pageHeight } = this;
    if (!hasPageSize) return;
    return new mxRectangle(0, 0, pageWidth, pageHeight);
  }

  setPageFormat() {
    if (!this.hasPageSize) return this;
    this.graph.pageFormat = this.pageFormat;
    return this;
  }

  configure() {
    const { graph, setPageFormat, setPageScale, setPageVisibility } = this;
    setPageScale();
    setPageVisibility();
    setPageFormat();
    graph.pageBreaksVisible = graph.pageVisible;
    graph.preferPageSize = graph.pageBreaksVisible;
  }
}
