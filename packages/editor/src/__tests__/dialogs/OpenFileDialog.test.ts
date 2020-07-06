import { OpenFileDialog } from "../../dialogs";
import { EditorUI } from "../..";

describe("OpenFileDialog", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
    dialog = new OpenFileDialog(ui);
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
          expect(dialog.width).toEqual(320);
        });
      });

      describe("height", () => {
        it("is set", () => {
          expect(dialog.height).toEqual(220);
        });
      });
    });

    describe("methods", () => {
      describe("createOpenFileDialog()", () => {
        it("is set", () => {
          expect(dialog.createOpenFileDialog()).toBeDefined();
        });
      });

      describe("createOpenDialog()", () => {
        it("is set", () => {
          expect(dialog.createOpenDialog()).toBeDefined();
        });
      });

      describe("openFile()", () => {
        it("no throw", () => {
          expect(() => dialog.openFile()).not.toThrow();
        });
      });
    });
  });
});
