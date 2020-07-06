import { ErrorDialog } from "../../dialogs";
import { EditorUI } from "../..";

describe("ErrorDialog", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
    dialog = new ErrorDialog(ui);
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
          expect(dialog.width).toEqual(340);
        });
      });

      describe("baseHeight", () => {
        it("is set", () => {
          expect(dialog.baseHeight).toEqual(100);
        });
      });
    });

    describe("methods", () => {
      describe("linesFor(msg)", () => {
        const msg = "yyy xx";

        it("is 1", () => {
          expect(dialog.linesFor(msg)).toEqual(1);
        });
      });

      describe("displayErrorDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.displayErrorDialog(opts)).not.toThrow();
        });
      });
    });
  });
});
