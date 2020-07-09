import { ScrollbarsManager, EditorUI } from "../../..";

describe("ScrollbarsManager", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new ScrollbarsManager(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBe(ui);
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("setScrollbars(value)", () => {
        const value = "x";
        it("no throw", () => {
          expect(() => instance.setScrollbars(value)).not.toThrow();
        });
      });

      describe("hasScrollbars()", () => {
        const value = "x";
        it("is rue", () => {
          expect(instance.hasScrollbars()).toBeTruthy();
        });
      });

      describe("resetScrollbars()", () => {
        it("reset - no throw", () => {
          expect(() => instance.resetScrollbars()).not.toThrow();
        });
      });
    });
  });
});
