import mx from "@mxgraph-app/mx";
const { mxUtils } = mx;

export class GraphExtracter {
  ui: any;

  constructor(ui) {
    this.ui = ui;
  }

  zapGremlins(text) {
    return text; // Graph.zapGremlins(
  }

  documentMode: any;

  /**
   * Extracs the graph model from the given HTML data from a data transfer event.
   */
  extractGraphModelFromHtml(data) {
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

  /**
   * Opens the given files in the editor.
   */
  extractGraphModelFromEvent(evt) {
    var result: any;
    var data: any;

    const { documentMode } = this;
    const { isCompatibleString } = this.ui;

    if (evt != null) {
      var provider =
        evt.dataTransfer != null ? evt.dataTransfer : evt.clipboardData;

      if (provider != null) {
        if (documentMode == 10 || documentMode == 11) {
          data = provider.getData("Text");
        } else {
          data =
            mxUtils.indexOf(provider.types, "text/html") >= 0
              ? provider.getData("text/html")
              : null;

          if (
            mxUtils.indexOf(
              provider.types,
              "text/plain" && (data == null || data.length == 0)
            )
          ) {
            data = provider.getData("text/plain");
          }
        }

        if (data != null) {
          data = this.zapGremlins(mxUtils.trim(data));

          // Tries parsing as HTML document with embedded XML
          var xml = this.extractGraphModelFromHtml(data);

          if (xml != null) {
            data = xml;
          }
        }
      }
    }

    if (data != null && isCompatibleString(data)) {
      result = data;
    }

    return result;
  }
}
