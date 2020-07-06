import { EditorUI, PageConfig } from "../";

describe("PageConfig", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
    dialog = new PageConfig(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(dialog.ui).toBe(ui);
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(dialog.editor).toBeDefined();
        });
      });

      describe("container", () => {
        it("is set", () => {
          expect(dialog.container).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("getDiagramContainerOffset()", () => {
        it("is offset value", () => {
          expect(dialog.getDiagramContainerOffset()).toBeDefined();
        });
      });

      describe("refresh(sizeDidChange)", () => {
        describe("sizeDidChange = true", () => {
          const sizeDidChange = true;
          it("no throw", () => {
            expect(() => dialog.refresh(sizeDidChange)).not.toThrow();
          });
        });

        describe("sizeDidChange = false", () => {
          const sizeDidChange = false;
          it("no throw", () => {
            expect(() => dialog.refresh(sizeDidChange)).not.toThrow();
          });
        });
      });
    });
  });
});
