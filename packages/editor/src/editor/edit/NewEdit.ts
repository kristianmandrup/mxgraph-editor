import { Editor } from "../Editor";

import { LinkOpener } from "./LinkOpener";

export class NewEdit {
  editor: Editor;
  linkOpener: LinkOpener;

  constructor(editor: Editor) {
    this.editor = editor;
    this.linkOpener = this.createLinkOpener();
  }

  get graph() {
    return this.editor.graph;
  }

  createLinkOpener() {
    return new LinkOpener(this.editor);
  }

  editAsNew(xml, title) {
    const { isClientMode, paramsFor, openLinkClientMode, openLink } = this;
    let params = paramsFor(title);
    const fn = isClientMode ? openLinkClientMode : openLink;
    fn(params, xml);
  }

  isModernBrowser() {
    const { documentMode } = this.editor;
    return documentMode == null || documentMode >= 10;
  }

  get isClientMode() {
    return typeof window.postMessage !== "undefined" && this.isModernBrowser;
  }

  createParams(title) {
    return title != null ? "?title=" + encodeURIComponent(title) : "";
  }

  paramsFor(title) {
    const { createParams } = this;
    const { urlParams } = this.editor;
    let params = createParams(title);
    if (urlParams["ui"] != null) {
      params += (params.length > 0 ? "&" : "?") + "ui=" + urlParams["ui"];
    }
    return params;
  }

  openLinkClientMode(params, xml) {
    return this.linkOpener.openLinkClientMode(params, xml);
  }

  openLink(p, xml) {
    return this.linkOpener.openLink(p, xml);
  }
}
