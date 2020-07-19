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

      describe("dec", () => {
        it("is set", () => {
          expect(instance.dec).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("setWithNode(node)", () => {
        it("gets node value", () => {
          const node = {};
          expect(instance.setWithNode(node)).toBeDefined();
        });
      });

      describe("setGraphXml(node)", () => {
        it("sets graph node by xml", () => {
          const node = {};
          expect(() => instance.setGraphXml(node)).not.toThrow();
        });
      });

      describe("reset()", () => {
        it("resets", () => {
          expect(() => instance.reset()).not.toThrow();
        });
      });

      describe("handleInvalidNode()", () => {
        it("throws", () => {
          expect(() => instance.handleInvalidNode()).toThrow();
        });
      });

      describe("setGraphModelNode()", () => {
        it("sets graph model node", () => {
          expect(() => instance.setGraphModelNode()).not.toThrow();
        });
      });

      describe("executeGraphModelTransaction()", () => {
        it("executes", () => {
          expect(() => instance.executeGraphModelTransaction()).not.toThrow();
        });
      });

      describe("setRootNode()", () => {
        it("sets root node", () => {
          expect(() => instance.setRootNode()).not.toThrow();
        });
      });

      describe("notifyResetGraphView()", () => {
        it("notify graph reset", () => {
          expect(() => instance.notifyResetGraphView()).not.toThrow();
        });
      });

      describe("createWrapper()", () => {
        it("creates wrapper element", () => {
          expect(instance.notifyResetGraphView()).toBeDefined();
        });
      });

      describe("clear()", () => {
        it("clears model", () => {
          expect(instance.clear()).toBeDefined();
        });
      });
    });
  });
});
