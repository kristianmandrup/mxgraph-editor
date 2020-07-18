import { EditorUI, VisibleScroller } from "../../../../../../";

describe("VisibleScroller", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new VisibleScroller(ui);
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

      // TODO: test for x,y, width, height
      describe("bounds", () => {
        it("is set", () => {
          expect(instance.bounds).toBeDefined();
        });
      });

      describe("shouldScroll", () => {
        it("is true", () => {
          expect(instance.shouldScroll).toBeTruthy();
        });
      });

      describe("shouldScrollLeft", () => {
        it("is true", () => {
          expect(instance.shouldScrollLeft).toBeTruthy();
        });
      });

      describe("scrollTop", () => {
        it("is set", () => {
          expect(instance.scrollTop).toBeDefined();
        });
      });

      describe("scrollLeft", () => {
        it("is set", () => {
          expect(instance.scrollLeft).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("doScroll()", () => {
        it("no throw", () => {
          expect(() => instance.doScroll()).not.toThrow();
        });
      });

      describe("scroll()", () => {
        it("no throw", () => {
          expect(() => instance.scroll()).not.toThrow();
        });
      });
    });
  });
});
