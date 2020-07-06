import { ColorDialog } from "../../dialogs";
import { EditorUI } from "../..";

describe("ColorDialog", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
    dialog = new ColorDialog(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(dialog.ui).toBe(ui);
        });
      });

      describe("dialogFactory", () => {
        it("is set", () => {
          expect(dialog.dialogFactory).toBeDefined();
        });
      });

      describe("width", () => {
        it("is set", () => {
          expect(dialog.width).toEqual(230);
        });
      });

      describe("height", () => {
        it("is set", () => {
          expect(dialog.height).toBeGreaterThan(100);
        });
      });

      describe("size", () => {
        it("is set", () => {
          expect(dialog.width).toEqual(420);
        });
      });
    });

    describe("methods", () => {
      describe("createColorDialog(opts)", () => {
        const opts = {};
        it("no throw", () => {
          expect(() => dialog.createColorDialog(opts)).not.toThrow();
        });
      });
    });
  });
});
