import { EditorUI, NoScrollbars } from "../../../..";

describe("NoScrollbars", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new NoScrollbars(ui);
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

      describe("container", () => {
        it("is set", () => {
          expect(instance.container).toBeDefined();
        });
      });

      describe("rectangleBounds", () => {
        it("is set", () => {
          expect(instance.rectangleBounds).toBeDefined();
        });
      });
      describe("rawRectangleBounds", () => {
        it("is set", () => {
          expect(instance.rawRectangleBounds).toBeDefined();
        });
      });
      describe("dy", () => {
        it("is set", () => {
          expect(instance.dy).toBeDefined();
        });
      });
      describe("translateX", () => {
        it("is set", () => {
          expect(instance.translateX).toBeDefined();
        });
      });

      describe("translateY", () => {
        it("is set", () => {
          expect(instance.translateY).toBeDefined();
        });
      });

      describe("translate", () => {
        it("is set", () => {
          expect(instance.translate).toBeDefined();
        });

        it("has x", () => {
          expect(instance.translate.x).toBeDefined();
        });

        it("has y", () => {
          expect(instance.translate.y).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("setRectangleBounds()", () => {
        it("no throw", () => {
          expect(() => instance.setRectangleBounds()).not.toThrow();
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
