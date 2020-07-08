import { BaseRefresher } from "./BaseRefresher";

export class NoQuirksRefresher extends BaseRefresher {
  refresh() {
    const { refresher } = this;
    const { quirks } = refresher;
    if (quirks) return false;

    const { footerHeight, offSet, sidebarFooterHeight, fw } = refresher;
    const {
      tabContainer,
      diagramContainer,
      footerContainer,
      sidebarContainer,
      formatContainer,
    } = refresher;
    if (footerHeight > 0) {
      footerContainer.style.bottom = offSet + "px";
    }

    diagramContainer.style.right = fw + "px";
    var th = 0;

    if (tabContainer != null) {
      tabContainer.style.bottom = footerHeight + offSet + "px";
      tabContainer.style.right = diagramContainer.style.right;
      th = tabContainer.clientHeight;
    }

    sidebarContainer.style.bottom =
      footerHeight + sidebarFooterHeight + offSet + "px";
    formatContainer.style.bottom = footerHeight + offSet + "px";
    diagramContainer.style.bottom = footerHeight + offSet + th + "px";
    return;
  }
}
