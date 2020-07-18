import { ImageDialog } from "../../../";
import { EditorUI } from "../../..";

describe("ImageDialog", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new ImageDialog(ui);
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
    });

    describe("methods", () => {
      describe("showImageDialog(title, value, fn, _ignoreExisting)", () => {
        const value = "x";
        const title = "link";
        const fn = () => {};

        it("no throw", () => {
          expect(() => dialog.showImageDialog(title, value, fn)).not.toThrow();
        });
      });
    });
  });
});
