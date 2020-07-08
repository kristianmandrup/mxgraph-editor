import { GraphExtractor } from "../../..";
import { EditorUI } from "../../..";

describe("GraphExtractor", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new GraphExtractor(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(dialog.ui).toBe(ui);
        });
      });

      describe("documentMode", () => {
        it("is set", () => {
          expect(dialog.documentMode).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("zapGremlins(text)", () => {
        const text = "x";
        it("no throw", () => {
          expect(dialog.zapGremlins(text)).toBeDefined();
        });
      });

      describe("extractGraphModelFromHtml(data)", () => {
        const data = "x";
        it("no throw", () => {
          expect(() => dialog.extractGraphModelFromHtml(data)).not.toThrow();
        });
      });

      describe("extractGraphModelFromEvent(evt)", () => {
        const evt = {};
        it("no throw", () => {
          expect(() => dialog.extractGraphModelFromEvent(evt)).not.toThrow();
        });
      });
    });
  });
});
