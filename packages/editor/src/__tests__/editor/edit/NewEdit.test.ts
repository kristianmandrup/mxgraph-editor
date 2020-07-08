import { NewEdit } from "../../../editor";
import { editor } from "../helpers";

describe("NewEdit", () => {
  let instance;
  beforeEach(() => {
    instance = new NewEdit(editor);
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
    describe("editAsNew(xml, title)", () => {
      it("edits - no throw", () => {
        const xml = "x";
        const title = "my title";
        expect(() => editor.editAsNew(xml, title)).not.toThrow();
      });
    });
  });
});
