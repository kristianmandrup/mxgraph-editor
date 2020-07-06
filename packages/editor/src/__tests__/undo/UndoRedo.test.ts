import { EditorUI, UndoRedo } from "../../";

describe("UndoRedo", () => {
  const editor = {};
  const container = document.createElement("div");

  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    dialog = new UndoRedo(ui);
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

      describe("actions", () => {
        it("is set", () => {
          expect(dialog.actions).toBeDefined();
        });
      });

      describe("isEditing", () => {
        it("is set", () => {
          expect(dialog.isEditing).toBeDefined();
        });
      });

      describe("undoManager", () => {
        it("is set", () => {
          expect(dialog.undoManager).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("canRedo()", () => {
        it("no throw", () => {
          expect(() => dialog.canRedo()).not.toThrow();
        });
      });

      describe("canUndo()", () => {
        it("no throw", () => {
          expect(() => dialog.canUndo()).not.toThrow();
        });
      });

      describe("addUndoListener()", () => {
        it("no throw", () => {
          expect(() => dialog.addUndoListener()).not.toThrow();
        });
      });
    });
  });
});
