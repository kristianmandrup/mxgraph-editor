import { GraphExtractor } from "../../..";
import { EditorUI } from "../../..";

describe("GraphExtractor", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new GraphExtractor(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBe(ui);
        });
      });

      describe("documentMode", () => {
        it("is set", () => {
          expect(instance.documentMode).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("zapGremlins(text)", () => {
        const text = "x";
        it("no throw", () => {
          expect(instance.zapGremlins(text)).toBeDefined();
        });
      });

      describe("extractGraphModelFromHtml(data)", () => {
        const data = "x";
        it("no throw", () => {
          expect(() => instance.extractGraphModelFromHtml(data)).not.toThrow();
        });
      });

      describe("extractGraphModelFromEvent(evt)", () => {
        const evt = {};
        it("no throw", () => {
          expect(() => instance.extractGraphModelFromEvent(evt)).not.toThrow();
        });
      });
    });
  });
});
