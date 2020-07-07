import { EditDataDialog } from "../../../ui/dialogs";
import { EditorUI } from "../../..";

describe("EditDataDialog", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new EditDataDialog(ui);
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
          expect(dialog.width).toEqual(480);
        });
      });

      describe("height", () => {
        it("is set", () => {
          expect(dialog.height).toEqual(420);
        });
      });
    });

    describe("methods", () => {
      describe("showDataDialog(cell)", () => {
        const cell = {};

        it("no throw", () => {
          expect(() => dialog.showDataDialog(cell)).not.toThrow();
        });
      });
    });
  });
});
