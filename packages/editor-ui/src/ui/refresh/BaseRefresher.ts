import { Refresher } from "./Refresher";

export class BaseRefresher {
  refresher: Refresher;

  constructor(refresher: Refresher) {
    this.refresher = refresher;
  }
}
