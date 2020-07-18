import { FilenameDialog } from "../../../dialogs";
import { EditorUI } from "../../..";

describe("FilenameDialog", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
    dialog = new FilenameDialog(ui);
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

      describe("width", () => {
        it("is set", () => {
          expect(dialog.width).toEqual(300);
        });
      });

      describe("height", () => {
        it("is set", () => {
          expect(dialog.height).toBeGreaterThan(100);
        });
      });

      describe("fileName", () => {
        it("is set", () => {
          expect(dialog.fileName).toBeDefined();
        });
      });

      describe("title", () => {
        it("is set", () => {
          expect(dialog.title).toBeDefined();
        });
      });

      describe("dlg", () => {
        it("is set", () => {
          expect(dialog.dlg).toBeDefined();
        });
      });

      describe("onOk", () => {
        it("is set", () => {
          expect(dialog.onOk).toBeDefined();
        });
      });

      describe("onCancel", () => {
        it("is set", () => {
          expect(dialog.onOk).toBeDefined();
        });
      });

      describe("modal", () => {
        it("is true", () => {
          expect(dialog.modal).toBeTruthy();
        });
      });

      describe("closable", () => {
        it("is true", () => {
          expect(dialog.closable).toBeTruthy();
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
