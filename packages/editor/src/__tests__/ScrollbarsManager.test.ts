import { ScrollbarsManager, EditorUI } from "../";

describe("ScrollbarsManager", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new ScrollbarsManager(ui);
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
    });

    describe("methods", () => {
      describe("setScrollbars(value)", () => {
        const value = "x";
        it("no throw", () => {
          expect(() => dialog.setScrollbars(value)).not.toThrow();
        });
      });

      describe("hasScrollbars()", () => {
        const value = "x";
        it("is rue", () => {
          expect(dialog.hasScrollbars()).toBeTruthy();
        });
      });

      describe("resetScrollbars()", () => {
        it("reset - no throw", () => {
          expect(() => dialog.resetScrollbars()).not.toThrow();
        });
      });
    });
  });
});
