import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
const { mxEvent } = mx;

export class NewEdit {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  editAsNew(xml, title) {
    const { isClientMode, paramsFor, openLinkClientMode, openLink } = this;
    let params = paramsFor(title);
    const fn = isClientMode ? openLinkClientMode : openLink;
    fn(params, xml);
  }

  get isClientMode() {
    const { documentMode } = this.editor;
    return (
      typeof window.postMessage !== "undefined" &&
      (documentMode == null || documentMode >= 10)
    );
  }

  paramsFor(title) {
    const { urlParams } = this.editor;
    let params = title != null ? "?title=" + encodeURIComponent(title) : "";
    if (urlParams["ui"] != null) {
      params += (params.length > 0 ? "&" : "?") + "ui=" + urlParams["ui"];
    }
    return params;
  }

  openLinkClientMode(params, xml) {
    const { getEditBlankUrl, graph } = this.editor;
    var wnd: any = null;

    var l = (evt) => {
      if (evt.data == "ready" && evt.source == wnd) {
        mxEvent.removeListener(window, "message", l);
        wnd.postMessage(xml, "*");
      }
    };

    mxEvent.addListener(window, "message", l);
    params = params + (params.length > 0 ? "&" : "?") + "client=1";
    wnd = graph.openLink(getEditBlankUrl(params), null, true);
  }

  openLink(p, xml) {
    const { graph, getEditBlankUrl } = this.editor;
    graph.openLink(getEditBlankUrl(p) + "#R" + encodeURIComponent(xml));
  }
}
