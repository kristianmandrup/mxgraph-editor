import { EditorGraph, GraphResetter } from "../../../editor";
import { editor } from "../../helpers";

describe("PageConfig", () => {
  let instance;
  const eg = new EditorGraph(editor);
  beforeEach(() => {
    instance = new GraphResetter(eg);
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
      describe("resetPage()", () => {
        it("resets page config for graph", () => {
          expect(instance.resetPage()).toBeDefined();
        });
      });

      describe("reset()", () => {
        it("resets graph", () => {
          expect(instance.reset()).toBeDefined();
        });
      });
    });
  });
});
