import { Undo } from "../../../editor";
import { editor } from "../helpers";

describe("Undo", () => {
  let instance;
  beforeEach(() => {
    instance = new Undo(editor);
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
    describe("addCell(cells, cell)", () => {
      it("no throw", () => {
        const cells = [{}];
        const cell = {};
        expect(() => instance.addCell(cells, cell)).not.toThrow();
      });
    });

    describe("undoHandler(sender, evt)", () => {
      it("no throw", () => {
        const sender = {};
        const evt = {};
        expect(() => instance.undoHandler(sender, evt)).not.toThrow();
      });
    });
  });
});
