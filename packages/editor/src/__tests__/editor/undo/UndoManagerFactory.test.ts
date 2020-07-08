import { UndoManagerFactory } from "../../../editor";
import { editor } from "../helpers";

describe("UndoManagerFactory", () => {
  let instance;
  beforeEach(() => {
    instance = new UndoManagerFactory(editor);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBe(editor);
        });
      });
    });
  });

  describe("methods", () => {
    describe("createUndoManagerInstance()", () => {
      it("creates mxUndoManager instance", () => {
        expect(instance.createUndoManagerInstance()).toBeDefined();
      });
    });

    describe("addUndoListeners()", () => {
      it("adds listeners", () => {
        expect(instance.addUndoListeners()).toBeDefined();
      });
    });

    describe("addRedoListeners()", () => {
      it("adds listeners", () => {
        expect(instance.addRedoListeners()).toBeDefined();
      });
    });

    describe("createUndoManager()", () => {
      it("creates and returns manager with undo/redo listeners", () => {
        expect(instance.createUndoManager()).toBeDefined();
      });
    });
  });
});
