import { EditorUI, InvisiblePage } from "../../../../../../";

describe("InvisiblePage", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new InvisiblePage(ui);
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

      describe("width", () => {
        it("is set", () => {
          expect(instance.width).toBeDefined();
        });
      });

      describe("height", () => {
        it("is set", () => {
          expect(instance.height).toBeDefined();
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
