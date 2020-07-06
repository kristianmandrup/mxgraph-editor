import { DialogManager } from "../../dialogs";
import { EditorUI } from "../..";

describe("DialogManager", () => {
  let manager, ui;
  beforeEach(() => {
    ui = new EditorUI();
    manager = new DialogManager(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(manager.ui).toBe(ui);
        });
      });

      describe("dialog", () => {
        it("is set", () => {
          expect(manager.dialog).toBeDefined();
        });
      });

      describe("dialogs", () => {
        it("is set", () => {
          expect(manager.dialogs).toBeDefined();
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(manager.editor).toBe(ui.editor);
        });
      });
    });

    describe("methods", () => {
      describe("hideDialog(cancel)", () => {
        const cancel = () => {};

        describe("cancel fn only", () => {
          it("no throw", () => {
            expect(() => manager.hideDialog(cancel)).not.toThrow();
          });
        });

        describe("isEsc = true", () => {
          const isEsc = true;
          it("no throw", () => {
            expect(() => manager.hideDialog(cancel, isEsc)).not.toThrow();
          });
        });
      });
    });
  });
});
