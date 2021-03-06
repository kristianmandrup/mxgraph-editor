import { EditorUI, VisiblePage } from "../../../../../../";

describe("VisiblePage", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new VisiblePage(ui);
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

      describe("pad", () => {
        it("is set", () => {
          expect(instance.pad).toBeDefined();
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
      describe("apply()", () => {
        it("no throw", () => {
          expect(() => instance.apply()).not.toThrow();
        });
      });
    });
  });
});
