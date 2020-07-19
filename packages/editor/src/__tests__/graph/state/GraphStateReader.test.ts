import { EditorGraph, GraphStateReader } from "../../../";
import { editor } from "../../helpers";

describe("EditorGraph", () => {
  let instance;
  // const eg = new EditorGraph(editor);
  beforeEach(() => {
    instance = new GraphStateReader(editor);
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
    describe("readGraphState(node)", () => {
      it("read Graph state from node", () => {
        const node = {};
        expect(instance.readGraphState(node)).toBeDefined();
      });
    });
  });
});
