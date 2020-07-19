import mx from "@mxgraph-app/mx";
const { mxEvent } = mx;

export class LinkOpener {
  editor: any;
  wnd: any = null;

  constructor(editor: any) {
    this.editor = editor;
  }

  get graph() {
    return this.editor.graph;
  }

  createWindowMessageHandler(xml) {
    const listener = (evt) => {
      const { wnd } = this;
      if (evt.data == "ready" && evt.source == wnd) {
        mxEvent.removeListener(window, "message", listener);
        wnd.postMessage(xml, "*");
      }
    };
    return listener;
  }

  createParams(params) {
    return params + (params.length > 0 ? "&" : "?") + "client=1";
  }

  openLinkClientMode(params, xml) {
    const { createWindowMessageHandler, createParams } = this;
    const { getEditBlankUrl, graph } = this.editor;
    const handler = createWindowMessageHandler(xml);
    mxEvent.addListener(window, "message", handler);
    params = createParams(params);
    this.wnd = graph.openLink(getEditBlankUrl(params), null, true);
  }

  createOpenLinkUrl(p, xml) {
    const { getEditBlankUrl } = this.editor;
    return getEditBlankUrl(p) + "#R" + encodeURIComponent(xml);
  }

  openLink(p, xml) {
    const { graph, createOpenLinkUrl } = this;
    const url = createOpenLinkUrl(p, xml);
    graph.openLink(url);
  }
}
