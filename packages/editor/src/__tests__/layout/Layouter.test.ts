import { Layouter } from "../../";
import { EditorUI } from "../../";

describe("Layouter", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new Layouter(ui);
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
      describe("executeLayout(exec, animate, post)", () => {
        describe("animate", () => {
          const exec = () => {};
          const animate = true;
          const post = () => {};
          it("no throw", () => {
            expect(() =>
              dialog.executeLayout(exec, animate, post)
            ).not.toThrow();
          });
        });

        describe("no animate", () => {
          const exec = () => {};
          const animate = false;
          const post = () => {};
          it("no throw", () => {
            expect(() =>
              dialog.executeLayout(exec, animate, post)
            ).not.toThrow();
          });
        });
      });
    });
  });
});
