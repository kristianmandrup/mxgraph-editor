import { EditorUI, WithScrollbars } from "../../../..";

describe("ScrollbarsManager", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new WithScrollbars(ui);
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

      describe("visiblePage", () => {
        it("is set", () => {
          expect(instance.visiblePage).toBeDefined();
        });
      });

      describe("invisiblePage", () => {
        it("is set", () => {
          expect(instance.invisiblePage).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createVisiblePage(editor)", () => {
        it("no throw", () => {
          expect(instance.createVisiblePage()).toBeDefined();
        });
      });

      describe("createInvisiblePage(editor)", () => {
        it("no throw", () => {
          expect(instance.createInvisiblePage()).toBeDefined();
        });
      });

      describe("visible()", () => {
        it("no throw", () => {
          expect(() => instance.visible()).not.toThrow();
        });
      });

      describe("invisible()", () => {
        it("no throw", () => {
          expect(() => instance.invisible()).not.toThrow();
        });
      });

      describe("apply()", () => {
        it("no throw", () => {
          expect(() => instance.apply()).not.toThrow();
        });
      });
    });
  });
});
