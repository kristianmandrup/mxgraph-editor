import { Editor } from "../Editor";
import mx from "@mxgraph-app/mx";
const { mxEvent } = mx;

export class NewEdit {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  editAsNew(xml, title) {
    const { getEditBlankUrl, urlParams, documentMode, graph } = this.editor;
    var p = title != null ? "?title=" + encodeURIComponent(title) : "";

    if (urlParams["ui"] != null) {
      p += (p.length > 0 ? "&" : "?") + "ui=" + urlParams["ui"];
    }

    if (
      typeof window.postMessage !== "undefined" &&
      (documentMode == null || documentMode >= 10)
    ) {
      var wnd: any = null;

      var l = (evt) => {
        if (evt.data == "ready" && evt.source == wnd) {
          mxEvent.removeListener(window, "message", l);
          wnd.postMessage(xml, "*");
        }
      };

      mxEvent.addListener(window, "message", l);
      wnd = graph.openLink(
        getEditBlankUrl(p + (p.length > 0 ? "&" : "?") + "client=1"),
        null,
        true
      );
    } else {
      graph.openLink(getEditBlankUrl(p) + "#R" + encodeURIComponent(xml));
    }
  }
}
