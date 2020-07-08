export class HtmlExtractor {
  ui: any;

  constructor(ui) {
    this.ui = ui;
  }

  /**
   * Extracs the graph model from the given HTML data from a data transfer event.
   */
  extract(data) {
    var result = null;

    try {
      var idx = data.indexOf("&lt;mxGraphModel ");

      if (idx >= 0) {
        var idx2 = data.lastIndexOf("&lt;/mxGraphModel&gt;");

        if (idx2 > idx) {
          result = data
            .substring(idx, idx2 + 21)
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/\\&quot;/g, '"')
            .replace(/\n/g, "");
        }
      }
    } catch (e) {
      // ignore
    }

    return result;
  }
}
