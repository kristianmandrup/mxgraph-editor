import { FileSaver } from "../../../dialogs";
import { EditorUI } from "../../..";

describe("FileSaver", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
    dialog = new FileSaver(ui);
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

      describe("useLocalStorage", () => {
        it("is false", () => {
          expect(dialog.useLocalStorage).toBeFalsy();
        });
      });
    });

    describe("methods", () => {
      describe("saveFile(forceDialog)", () => {
        const forceDialog = false;
        it("no throw", () => {
          expect(() => dialog.saveFile(forceDialog)).not.toThrow();
        });
      });

      describe("save(name)", () => {
        const name = "x";
        it("no throw", () => {
          expect(() => dialog.save(name)).not.toThrow();
        });
      });
    });
  });
});
