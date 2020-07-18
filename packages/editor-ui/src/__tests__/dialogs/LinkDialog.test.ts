import { LinkDialog } from "../../../ui";
import { EditorUI } from "../../..";

describe("LinkDialog", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new LinkDialog(ui);
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
          expect(dialog.width).toEqual(420);
        });
      });

      describe("height", () => {
        it("is set", () => {
          expect(dialog.height).toEqual(90);
        });
      });
    });

    describe("methods", () => {
      describe("showLinkDialog(value, btnLabel, fn)", () => {
        const value = "x",
          btnLabel = "link",
          fn = () => {};

        it("no throw", () => {
          expect(() =>
            dialog.showLinkDialog(value, btnLabel, fn)
          ).not.toThrow();
        });
      });
    });
  });
});
