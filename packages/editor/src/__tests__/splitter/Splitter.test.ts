import { EditorUI, Splitter } from "../../";

describe("Splitter", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new Splitter(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(dialog.ui).toBe(ui);
        });
      });

      describe("footerHeight", () => {
        it("is set", () => {
          expect(dialog.footerHeight).toBeDefined();
        });
      });

      describe("hsplitClickEnabled", () => {
        it("is set", () => {
          expect(dialog.hsplitClickEnabled).toBeDefined();
        });
      });

      describe("destroyFunctions", () => {
        it("is set", () => {
          expect(dialog.destroyFunctions).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("addSplitHandler(elt, horizontal, dx, onChange)", () => {
        const elem = document.createElement("div");
        const horizontal = true,
          dx = 0;
        const onChange = () => {};
        it("no throw", () => {
          expect(() =>
            dialog.addSplitHandler(elem, horizontal, dx, onChange)
          ).not.toThrow();
        });
      });
    });
  });
});
