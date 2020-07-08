import mx from "@mxgraph-app/mx";
import { HtmlExtractor } from "./HtmlExtractor";
const { mxUtils } = mx;

export class EventExtractor {
  ui: any;
  htmlExtractor: HtmlExtractor;

  constructor(ui) {
    this.ui = ui;
    this.htmlExtractor = new HtmlExtractor(ui);
  }

  zapGremlins(text) {
    return text; // Graph.zapGremlins(
  }

  documentMode: any;

  providerFor(evt) {
    return evt.dataTransfer != null ? evt.dataTransfer : evt.clipboardData;
  }

  /**
   * Opens the given files in the editor.
   */
  extract(evt) {
    const { isCompatibleString } = this.ui;
    if (!evt) return;
    const provider = this.providerFor(evt);
    let data = this.getData(provider);
    if (!isCompatibleString(data)) return;
    return data;
  }

  get isTextMode() {
    const { documentMode } = this.ui;
    return documentMode == 10 || documentMode == 11;
  }

  getData(provider) {
    if (!provider) return;
    const { isTextMode, textData, htmlData } = this;
    let data = isTextMode ? textData(provider) : htmlData(provider);
    return this.postProcessData(data);
  }

  textData(provider) {
    return provider.getData("Text");
  }

  htmlData(provider) {
    let data =
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
    return data;
  }

  postProcessData(data) {
    if (!data) return data;
    data = this.zapGremlins(mxUtils.trim(data));

    // Tries parsing as HTML document with embedded XML
    var xml = this.extractGraphModelFromHtml(data);

    if (xml != null) {
      data = xml;
    }

    return data;
  }

  extractGraphModelFromHtml(data) {
    return this.htmlExtractor.extract(data);
  }
}
