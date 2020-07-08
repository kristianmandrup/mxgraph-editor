import { EditorGraph } from "../../../editor";
import { editor } from "../helpers";

describe("EditorGraph", () => {
  let instance;
  beforeEach(() => {
    instance = new EditorGraph(editor);
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
    describe("createGraphInstance(_model, _themes)", () => {
      it("creates Graph instance", () => {
        const model = {},
          themes = ["default"];
        expect(instance.createGraphInstance(model, themes)).toBeDefined();
      });
    });

    describe("createGraph(themes, model)", () => {
      it("creates and configures Graph", () => {
        const model = {},
          themes = ["default"];
        expect(instance.createGraph(themes, model)).toBeDefined();
      });
    });

    describe("resetGraph()", () => {
      it("resets graph - no throw", () => {
        expect(() => instance.resetGraph()).not.toThrow();
      });
    });

    describe("readGraphState(node)", () => {
      it("reads graph state - no throw", () => {
        const node = {};
        expect(() => instance.readGraphState(node)).not.toThrow();
      });
    });

    describe("setGraphXml(node)", () => {
      it("sets graph xml - no throw", () => {
        const node = {};
        expect(() => instance.setGraphXml(node)).not.toThrow();
      });
    });

    describe("getGraphXml(ignoreSelection)", () => {
      describe("ignoreSelection = false", () => {
        it("gets graph xml with current selection included", () => {
          const ignoreSelection = false;
          expect(instance.getGraphXml(ignoreSelection)).toBeDefined();
        });
      });

      describe("ignoreSelection = true", () => {
        it("gets graph xml with current selection EXcluded", () => {
          const ignoreSelection = true;
          expect(instance.getGraphXml(ignoreSelection)).not.toThrow();
        });
      });
    });

    describe("updateGraphComponents()", () => {
      it("updates graph components", () => {
        expect(() => instance.updateGraphComponents()).not.toThrow();
      });
    });

    describe("fireEvent(event)", () => {
      it("fires event - no throw", () => {
        const event = { msg: "hello" };
        expect(() => instance.fireEvent(event)).not.toThrow();
      });
    });
  });
});
