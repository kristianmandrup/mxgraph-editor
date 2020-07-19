import { EditorGraph, GraphXmlGetter } from "../../../";
import { editor } from "../../helpers";

describe("PageConfig", () => {
  let instance;
  const eg = new EditorGraph(editor);
  beforeEach(() => {
    instance = new GraphXmlGetter(eg);
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
    });

    describe("methods", () => {
      describe("getNode()", () => {
        it("gets node value", () => {
          expect(instance.getNode()).toBeDefined();
        });
      });

      describe("encodeSelectedCells()", () => {
        it("encodes selected cells", () => {
          expect(instance.encodeSelectedCells()).toBeDefined();
        });
      });

      describe("createEncoder()", () => {
        it("creates encoder", () => {
          expect(instance.createEncoder()).toBeDefined();
        });
      });

      describe("loadFromXmlDocument()", () => {
        it("loads from xml document", () => {
          expect(instance.loadFromXmlDocument()).toBeDefined();
        });
      });

      describe("setNode()", () => {
        it("sets node to node value", () => {
          const node = {};
          expect(instance.setNode()).toBeDefined();
        });
      });

      describe("nodeDeltaConfig", () => {
        it("sets node dx and dy", () => {
          expect(instance.nodeDeltaConfig).toBeDefined();
        });
      });

      describe("nodePageConfig()", () => {
        it("sets node page attributes", () => {
          expect(instance.nodePageConfig()).toBeDefined();
        });
      });

      describe("nodeGridConfig()", () => {
        it("sets node grid attributes", () => {
          expect(instance.nodeGridConfig()).toBeDefined();
        });
      });

      describe("nodeBackgroundConfig()", () => {
        it("sets node background", () => {
          expect(instance.nodeBackgroundConfig()).toBeDefined();
        });
      });

      describe("getGraphXml(ignoreSelection)", () => {
        it("gets graph node from xml document", () => {
          const ignoreSelection = true;
          expect(instance.getGraphXml(ignoreSelection)).toBeDefined();
        });
      });
    });
  });
});
