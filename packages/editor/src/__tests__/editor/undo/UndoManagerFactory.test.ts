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
    describe("createUndoManager()", () => {
      it("is a filename", () => {
        expect(editor.createUndoManager()).toBeDefined();
      });
    });
  });
});
