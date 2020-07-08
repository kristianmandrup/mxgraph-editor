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

      describe("isClientMode", () => {
        it("is true", () => {
          expect(instance.isClientMode).toBeTruthy();
        });
      });
    });
  });

  describe("methods", () => {
    describe("paramsFor(title)", () => {
      it("edits - no throw", () => {
        const title = "my title";
        expect(instance.paramsFor(title)).toBeDefined();
      });
    });

    describe("openLinkClientMode(params, xml)", () => {
      it("opens - no throw", () => {
        const params = "x",
          xml = "x";
        expect(() => instance.openLinkClientMode(params, xml)).not.toThrow();
      });
    });

    describe("openLink(params, xml)", () => {
      it("opens - no throw", () => {
        const params = "x",
          xml = "x";
        expect(() => instance.openLink(params, xml)).not.toThrow();
      });
    });

    describe("editAsNew(xml, title)", () => {
      it("edits - no throw", () => {
        const xml = "x";
        const title = "my title";
        expect(() => instance.editAsNew(xml, title)).not.toThrow();
      });
    });
  });
});
