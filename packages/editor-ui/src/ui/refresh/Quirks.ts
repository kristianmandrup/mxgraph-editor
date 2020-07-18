import { BaseRefresher } from "./BaseRefresher";

export class QuirksRefresher extends BaseRefresher {
  refresh() {
    const { refresher } = this;
    const { quirks, size } = refresher;
    const {
      menubarContainer,
      toolbarContainer,
      footerHeight,
      menubarHeight,
      toolbarHeight,
      sidebarFooterHeight,
      sidebarContainer,
      formatContainer,
      diagramContainer,
      footerContainer,
      tabContainer,
      hsplit,
      effHsplitPosition,
      splitSize,
      offSet,
      fw,
    } = refresher;
    const { width, height } = size;

    if (!quirks) return false;
    menubarContainer.style.width = width + "px";
    toolbarContainer.style.width = menubarContainer.style.width;
    var sidebarHeight = Math.max(
      0,
      height - footerHeight - menubarHeight - toolbarHeight
    );
    sidebarContainer.style.height = sidebarHeight - sidebarFooterHeight + "px";
    formatContainer.style.height = sidebarHeight + "px";
    diagramContainer.style.width =
      hsplit.parentNode != null
        ? Math.max(0, width - effHsplitPosition - splitSize - fw) + "px"
        : width + "px";
    footerContainer.style.width = menubarContainer.style.width;
    var diagramHeight = Math.max(
      0,
      height - footerHeight - menubarHeight - toolbarHeight
    );

    if (tabContainer != null) {
      tabContainer.style.width = diagramContainer.style.width;
      tabContainer.style.bottom = footerHeight + offSet + "px";
      diagramHeight -= tabContainer.clientHeight;
    }

    diagramContainer.style.height = diagramHeight + "px";
    hsplit.style.height = diagramHeight + "px";
    return;
  }
}
