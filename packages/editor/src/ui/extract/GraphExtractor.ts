import { EventExtractor } from "./EventExtractor";
import { HtmlExtractor } from "./HtmlExtractor";

export class GraphExtractor {
  ui: any;
  eventExtractor: EventExtractor;
  htmlExtractor: HtmlExtractor;

  constructor(ui) {
    this.ui = ui;
    this.eventExtractor = new EventExtractor(ui);
    this.htmlExtractor = new HtmlExtractor(ui);
  }

  /**
   * Extracs the graph model from the given HTML data from a data transfer event.
   */
  extractGraphModelFromHtml(data) {
    return this.htmlExtractor.extract(data);
  }

  extractGraphModelFromEvent(evt) {
    this.eventExtractor.extract(evt);
  }
}
