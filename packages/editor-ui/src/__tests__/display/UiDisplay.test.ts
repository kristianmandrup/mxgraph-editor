import { EditorUI, UiDisplay } from "../../..";

describe("Splitter", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new UiDisplay(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(dialog.ui).toBe(ui);
        });
      });

      describe("factory", () => {
        it("is set", () => {
          expect(dialog.factory).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createUi()", () => {
        it("no throw", () => {
          expect(() => dialog.createUi()).not.toThrow();
        });
      });
    });
  });
});
