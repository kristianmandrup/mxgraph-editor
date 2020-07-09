export class HtmlExtractor {
  ui: any;
  data: any;

  constructor(ui, data?) {
    this.ui = ui;
    this.data = data;
  }

  get idx() {
    return this.data.indexOf("&lt;mxGraphModel ");
  }

  get idx2() {
    return this.data.lastIndexOf("&lt;/mxGraphModel&gt;");
  }

  processData(data?) {
    data = data || this.data;
    const { idx, idx2 } = this;
    return data
      .substring(idx, idx2 + 21)
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/\\&quot;/g, '"')
      .replace(/\n/g, "");
  }

  /**
   * Extracs the graph model from the given HTML data from a data transfer event.
   */
  extract(data) {
    data = data || this.data;
    this.data = data;
    const { idx, idx2 } = this;
    try {
      if (idx < 0) return;
      if (idx2 <= idx) return;
      return this.processData(data);
    } catch (e) {
      // ignore
      return;
    }
  }
}
