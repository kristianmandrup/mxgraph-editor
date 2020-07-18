import { Layouter } from "../../..";
import { EditorUI } from "../../..";

describe("Layouter", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new Layouter(ui);
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
      const animate = true;
      const post = () => {};

      describe("doFinally(animate, post)", () => {
        it("no throw", () => {
          expect(() => instance.doFinally(animate, post)).not.toThrow();
        });
      });

      describe("noAnimationSupport(post)", () => {
        it("no throw", () => {
          expect(() => instance.noAnimationSupport(post)).not.toThrow();
        });
      });

      describe("addAnimationSupport(animate, post)", () => {
        it("no throw", () => {
          expect(() =>
            instance.addAnimationSupport(animate, post)
          ).not.toThrow();
        });
      });

      describe("executeLayout(exec, animate, post)", () => {
        describe("animate", () => {
          const exec = () => {};
          it("no throw", () => {
            expect(() =>
              instance.executeLayout(exec, animate, post)
            ).not.toThrow();
          });
        });

        describe("no animate", () => {
          const exec = () => {};
          const animate = false;
          const post = () => {};
          it("no throw", () => {
            expect(() =>
              instance.executeLayout(exec, animate, post)
            ).not.toThrow();
          });
        });
      });
    });
  });
});
