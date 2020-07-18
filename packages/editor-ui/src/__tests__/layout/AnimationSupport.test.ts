import { AnimationSupport, EditorUI } from "../../..";

describe("ScrollbarsManager", () => {
  const editor = {};
  const container = document.createElement("div");

  const animate = true;
  const post = () => {};

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new AnimationSupport(ui, { animate, post });
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBe(ui);
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBeDefined();
        });
      });

      describe("shouldAnimate", () => {
        it("is true", () => {
          expect(instance.shouldAnimate).toBeTruthy();
        });
      });
    });

    describe("methods", () => {
      describe("enable()", () => {
        it("enables - no throw", () => {
          expect(() => instance.enable()).not.toThrow();
        });
      });

      describe("createMorphing()", () => {
        it("creates morph", () => {
          expect(instance.createMorphing()).toBeDefined();
        });
      });

      describe("addMorphListener(morph)", () => {
        it("adds listener", () => {
          const morph = instance.createMorphing();
          expect(instance.addMorphListener(morph)).toBeDefined();
        });
      });
    });
  });
});
