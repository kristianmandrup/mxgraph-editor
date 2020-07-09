import { HtmlExtractor } from "../../..";
import { EditorUI } from "../../..";

describe("HtmlExtractor", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new HtmlExtractor(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBe(ui);
        });
      });

      describe("idx", () => {
        it("is set", () => {
          expect(instance.idx).toBeDefined();
        });
      });

      describe("idx2", () => {
        it("is set", () => {
          expect(instance.idx2).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("processData(data)", () => {
        const data = "x";
        it("is processed", () => {
          expect(instance.processData(data)).toBeDefined();
        });
      });

      describe("extract(data)", () => {
        const data = "x";
        it("is extracted", () => {
          expect(instance.extract(data)).toBeDefined();
        });
      });
    });
  });
});
