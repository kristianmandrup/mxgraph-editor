import mx from "@mxgraph-app/mx";
import { QuirksRefresher } from "./Quirks";
import { NoQuirksRefresher } from "./NoQuirks";
const { mxClient } = mx;

interface ISize {
  width: number;
  height: number;
}

export class Refresher {
  editor: any;
  container: any;
  documentMode: any;
  hsplitPosition: any;
  splitSize: any;
  menubar: any;
  menubarContainer: any;
  menubarHeight: any;
  toolbar: any;
  toolbarContainer: any;
  toolbarHeight: any;
  sidebarFooterContainer: any;
  sidebarContainer: any;
  footerHeight: any;
  sidebarFooterHeight: any;
  formatContainer;
  format: any;
  formatWidth: any;
  diagramContainer: any;
  footerContainer: any;
  tabContainer: any;
  hsplit: any;
  fw: any;

  getDiagramContainerOffset: any; // fn

  contLeft: any;
  effHsplitPosition: any;
  height: number = 0;
  width: number = 0;

  _size: ISize = {
    height: this.height,
    width: this.width,
  };

  offSet: number = 0;
  tmp: number = 0;

  constructor() {}

  set size(size) {
    this._size = size;
    this.height = size.height;
    this.width = size.width;
  }

  get size() {
    return this._size;
  }

  get quirks() {
    const { documentMode } = this;
    return mxClient.IS_IE && (documentMode == null || documentMode == 5);
  }

  get containerSize(): ISize {
    const { containerHeight, containerWidth } = this;
    return {
      height: containerHeight,
      width: containerWidth,
    };
  }

  get containerWidth() {
    return this.container.clientWidth;
  }

  get containerHeight() {
    return this.container.clientHeight;
  }

  get docSize(): ISize {
    const { docHeight, docWidth } = this;
    return {
      height: docHeight,
      width: docWidth,
    };
  }

  get docWidth() {
    return document.body.clientWidth || document.documentElement.clientWidth;
  }

  get docHeight() {
    return this.quirks
      ? document.body.clientHeight || document.documentElement.clientHeight
      : document.documentElement.clientHeight;
  }

  get isBodyContainer() {
    return this.container == document.body;
  }

  setOffset() {
    // Workaround for bug on iOS see
    // http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
    // FIXME: Fix if footer visible
    this.offSet = 0;

    if (mxClient.IS_IOS && !window.navigator["standalone"]) {
      if (window.innerHeight != document.documentElement.clientHeight) {
        this.offSet =
          document.documentElement.clientHeight - window.innerHeight;
        window.scrollTo(0, 0);
      }
    }
  }

  setEffHsplitPosition() {
    const { width } = this;
    const effHsplitPosition = Math.max(
      0,
      Math.min(this.hsplitPosition, width - this.splitSize - 20)
    );
    this.effHsplitPosition = effHsplitPosition;
    return effHsplitPosition;
  }

  setTemp() {
    let tmp = 0;

    if (this.menubar != null) {
      this.menubarContainer.style.height = this.menubarHeight + "px";
      tmp += this.menubarHeight;
    }

    if (this.toolbar != null) {
      this.toolbarContainer.style.top = this.menubarHeight + "px";
      this.toolbarContainer.style.height = this.toolbarHeight + "px";
      tmp += this.toolbarHeight;
    }

    if (tmp > 0 && !mxClient.IS_QUIRKS) {
      tmp += 1;
    }
    this.tmp = tmp;
  }

  setSidebarFooterContainer() {
    const { offSet, tmp, effHsplitPosition, height } = this;
    var sidebarFooterHeight = 0;
    if (this.sidebarFooterContainer != null) {
      var bottom = this.footerHeight + offSet;
      sidebarFooterHeight = Math.max(
        0,
        Math.min(height - tmp - bottom, this.sidebarFooterHeight)
      );
      this.sidebarFooterContainer.style.width = effHsplitPosition + "px";
      this.sidebarFooterContainer.style.height = sidebarFooterHeight + "px";
      this.sidebarFooterContainer.style.bottom = bottom + "px";
    }
  }

  setSize() {
    const { containerSize, docSize, isBodyContainer } = this;
    const size = isBodyContainer ? docSize : containerSize;
    this.size = size;
    this.height = size.height;
    this.width = size.width;
    return size;
  }

  setSidebarContainer() {
    const { tmp, effHsplitPosition } = this;
    this.sidebarContainer.style.top = tmp + "px";
    this.sidebarContainer.style.width = effHsplitPosition + "px";
  }

  setFormatContainer() {
    const { tmp } = this;
    const fw = this.format != null ? this.formatWidth : 0;
    this.fw = fw;
    this.formatContainer.style.top = tmp + "px";
    this.formatContainer.style.width = fw + "px";
    this.formatContainer.style.display = this.format != null ? "" : "none";
  }

  setDiagramContainer() {
    const { tmp, effHsplitPosition } = this;
    var diagContOffset = this.getDiagramContainerOffset();
    const contLeft =
      this.hsplit.parentNode != null ? effHsplitPosition + this.splitSize : 0;
    this.contLeft = contLeft;
    this.diagramContainer.style.left = contLeft + diagContOffset.x + "px";
    this.diagramContainer.style.top = tmp + diagContOffset.y + "px";
  }

  setFooterContainer() {
    this.footerContainer.style.height = this.footerHeight + "px";
    this.footerContainer.style.display = this.footerHeight == 0 ? "none" : "";
  }

  setHorizontalSplit() {
    const { offSet, effHsplitPosition } = this;
    this.hsplit.style.top = this.sidebarContainer.style.top;
    this.hsplit.style.bottom = this.footerHeight + offSet + "px";
    this.hsplit.style.left = effHsplitPosition + "px";
  }

  setTabContainer() {
    if (!this.tabContainer) return;
    const { contLeft } = this;
    this.tabContainer.style.left = contLeft + "px";
  }

  /**
   * Refreshes the viewport.
   */
  refresh(sizeDidChange = true) {
    const { setSize, setOffset, setEffHsplitPosition, setTemp } = this;

    setSize();
    setOffset();
    setTemp();

    const {
      setSidebarFooterContainer,
      setSidebarContainer,
      setFormatContainer,
      setDiagramContainer,
      setFooterContainer,
      setHorizontalSplit,
      setTabContainer,
    } = this;

    setEffHsplitPosition();
    setSidebarFooterContainer();
    setSidebarContainer();
    setFormatContainer();
    setDiagramContainer();
    setFooterContainer();
    setHorizontalSplit();
    setTabContainer();

    const { withQuirks, noQuirks } = this;

    withQuirks() || noQuirks();

    if (sizeDidChange) {
      this.editor.graph.sizeDidChange();
    }
  }

  withQuirks() {
    return new QuirksRefresher(this).refresh();
  }

  noQuirks() {
    return new NoQuirksRefresher(this).refresh();
  }
}
