import { Editor } from "../Editor";

export class EditorSetup {
  // Cross-domain window access is not allowed in FF, so if we
  // were opened from another domain then this will fail.
  setup() {
    try {
      let op: any = window;

      while (this.isOpen(op)) {
        op = op.opener;
      }
      // Increments the counter in the first opener in the chain
      this.incrementPageCounter(op);
    } catch (e) {
      // ignore
    }
  }

  // Increments the counter in the first opener in the chain
  incrementPageCounter(op) {
    if (!op) return;
    op.Editor.pageCounter++;
    Editor.pageCounter = op.Editor.pageCounter;
  }

  isOpen(op) {
    return (
      op.opener != null &&
      typeof op.opener.Editor !== "undefined" &&
      !isNaN(op.opener.Editor.pageCounter) &&
      // Workaround for possible infinite loop in FF https://drawio.atlassian.net/browse/DS-795
      op.opener != op
    );
  }
}
