import { LinkOpener } from "../../editor";
import { editor } from "../helpers";

describe("NewEdit", () => {
  let instance;
  beforeEach(() => {
    instance = new LinkOpener(editor);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBe(editor);
        });
      });
    });

    describe("methods", () => {
      describe("createParams(params)", () => {
        it("creates full params", () => {
          const params = "x=2";
          expect(instance.createParams(params)).toBeDefined();
        });
      });

      describe("createWindowMessageHandler(xml)", () => {
        it("creates full params", () => {
          const xml = "<rect x='2'/>";
          expect(instance.createWindowMessageHandler(xml)).toBeDefined();
        });
      });

      describe("createOpenLinkUrl(p, xml)", () => {
        it("creates open link url", () => {
          const p = "x=2";
          const xml = "<rect x='2'/>";
          expect(instance.createOpenLinkUrl(p, xml)).toBeDefined();
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
    });
  });
});
