import mx from "@mxgraph-app/mx";
import { HtmlExtractor } from "./HtmlExtractor";
const { mxUtils } = mx;

export class EventExtractor {
  ui: any;
  htmlExtractor: HtmlExtractor;
  evt: any;
  provider: any;
  data: any;

  constructor(ui, evt?) {
    this.ui = ui;
    this.htmlExtractor = new HtmlExtractor(ui);
    this.evt = evt;
  }

  get isTextMode() {
    const { documentMode } = this.ui;
    return documentMode == 10 || documentMode == 11;
  }

  zapGremlins(text) {
    return text; // Graph.zapGremlins(
  }

  documentMode: any;

  setProvider(evt) {
    evt = evt || this.evt;
    const provider =
      evt.dataTransfer != null ? evt.dataTransfer : evt.clipboardData;
    this.provider = provider;
    return provider;
  }

  isCompatibleString(_data) {
    return true;
  }

  /**
   * Opens the given files in the editor.
   */
  extract(evt?: any) {
    evt = evt || this.evt;
    const { isCompatibleString, setProvider } = this;
    setProvider(evt);
    if (!evt) return;
    let data = this.getData();
    if (!isCompatibleString(data)) return;
    return data;
  }

  getData() {
    const { provider } = this;
    if (!provider) return;
    const { isTextMode, textData, htmlData } = this;
    let data = isTextMode ? textData() : htmlData();
    return this.postProcessData(data);
  }

  textData(data?) {
    data = data || this.data;
    data = this.provider.getData("Text");
    this.data = data;
    return data;
  }

  getTextHtml(data?) {
    data = data || this.data;
    const { provider } = this;
    return mxUtils.indexOf(provider.types, "text/html") >= 0
      ? provider.getData("text/html")
      : null;
  }
  getTextPlain(data?) {
    data = data || this.data;
    const { provider } = this;
    return provider.getData("text/plain");
  }

  isPlain(data?) {
    data = data || this.data;
    const { provider } = this;
    const noData = data == null || data.length == 0;
    return mxUtils.indexOf(provider.types, "text/plain") && noData;
  }

  htmlData(data?) {
    data = data || this.data;
    const { isPlain, getTextPlain, getTextHtml } = this;
    data = isPlain(data) ? getTextPlain(data) : getTextHtml(data);
    this.data = data;
    return data;
  }

  postProcessData(data?) {
    data = data || this.data;
    if (!data) return data;
    data = this.zapGremlins(mxUtils.trim(data));

    // Tries parsing as HTML document with embedded XML
    const xml = this.extractGraphModelFromHtml(data);
    if (xml) return xml;
    return data;
  }

  extractGraphModelFromHtml(data?) {
    data = data || this.data;
    return this.htmlExtractor.extract(data);
  }
}
