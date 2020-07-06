import { EditorUI, UiDisplay } from "../../";

describe("Splitter", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
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
