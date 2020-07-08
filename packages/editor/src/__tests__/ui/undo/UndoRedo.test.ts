import { EditorUI, UndoRedo } from "../../..";

describe("UndoRedo", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new UndoRedo(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBe(ui);
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBeDefined();
        });
      });

      describe("actions", () => {
        it("is set", () => {
          expect(instance.actions).toBeDefined();
        });
      });

      describe("isEditing", () => {
        it("is set", () => {
          expect(instance.isEditing).toBeDefined();
        });
      });

      describe("undoManager", () => {
        it("is set", () => {
          expect(instance.undoManager).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("canRedo()", () => {
        it("no throw", () => {
          expect(() => instance.canRedo()).not.toThrow();
        });
      });

      describe("canUndo()", () => {
        it("no throw", () => {
          expect(() => instance.canUndo()).not.toThrow();
        });
      });

      describe("configureUndoListener()", () => {
        it("undo listener", () => {
          expect(instance.configureUndoListener()).toBeDefined();
        });
      });

      describe("setStartEditing(undoListener)", () => {
        it("no throw", () => {
          const undoListener = () => {};
          expect(() => instance.setStartEditing(undoListener)).not.toThrow();
        });
      });

      describe("setStopEditing(undoListener)", () => {
        it("no throw", () => {
          const undoListener = () => {};
          expect(() => instance.setStopEditing(undoListener)).not.toThrow();
        });
      });

      describe("addUndoListener()", () => {
        it("no throw", () => {
          expect(() => instance.addUndoListener()).not.toThrow();
        });
      });
    });
  });
});
