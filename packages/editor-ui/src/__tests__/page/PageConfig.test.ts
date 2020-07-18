import { EditorUI, PageConfig } from "../../..";

describe("PageConfig", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new PageConfig(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(dialog.ui).toBe(ui);
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(dialog.graph).toBeDefined();
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(dialog.editor).toBeDefined();
        });
      });

      describe("actions", () => {
        it("is set", () => {
          expect(dialog.actions).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("setPageFormat(value)", () => {
        const value = "x";
        it("no throw", () => {
          expect(() => dialog.setPageFormat(value)).not.toThrow();
        });
      });

      describe("setPageScale(value)", () => {
        const value = "x";
        it("no throw", () => {
          expect(() => dialog.setPageScale(value)).not.toThrow();
        });
      });
    });
  });
});
