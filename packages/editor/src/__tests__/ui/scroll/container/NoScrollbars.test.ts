import { EditorUI, NoScrollbars } from "../../../..";

describe("ScrollbarsManager", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new NoScrollbars(ui);
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
    });
  });
});
