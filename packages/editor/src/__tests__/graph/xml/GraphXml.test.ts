import { EditorGraph, GraphXml } from "../../../";
import { editor } from "../../helpers";

describe("PageConfig", () => {
  let instance;
  const eg = new EditorGraph(editor);
  beforeEach(() => {
    instance = new GraphXml(eg);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("eg", () => {
        it("is set", () => {
          expect(instance.eg).toBe(eg);
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBe(editor);
        });
      });

      describe("graphXmlGetter", () => {
        it("is set", () => {
          expect(instance.graphXmlGetter).toBeDefined();
        });
      });

      describe("graphXmlSetter", () => {
        it("is set", () => {
          expect(instance.graphXmlSetter).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("setGraphXml(node)", () => {
        it("sets graph xml - no throw", () => {
          const node = {};
          expect(() => instance.setGraphXml(node)).not.toThrow();
        });
      });

      describe("getGraphXml(node)", () => {
        it("gets graph xml - no throw", () => {
          const node = {};
          expect(() => instance.getGraphXml(node)).not.toThrow();
        });
      });
    });
  });
});
