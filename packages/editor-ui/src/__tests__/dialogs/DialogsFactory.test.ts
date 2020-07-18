import { EditDataDialog } from "../../dialogs";
import { EditorUI } from "../..";

class MyColorDialog {}

describe("EditDataDialog", () => {
  let dialog, ui;
  beforeEach(() => {
    ui = new EditorUI();
    dialog = new EditDataDialog(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(dialog.ui).toBe(ui);
        });
      });

      describe("classMap", () => {
        describe("default", () => {
          it("is set", () => {
            expect(dialog.classMap).toBeDefined();
          });
        });

        describe("custom", () => {
          it("is set", () => {
            const customClassMap = {
              ColorDialog: MyColorDialog,
            };
            dialog = new EditDataDialog(ui, customClassMap);
            expect(dialog.classMap).toBe(customClassMap);
          });
        });
      });
    });

    describe("methods", () => {
      describe("createErrorDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createErrorDialog(opts)).not.toThrow();
        });
      });

      describe("createDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createDialog(opts)).not.toThrow();
        });
      });

      describe("createColorDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createColorDialog(opts)).not.toThrow();
        });
      });

      describe("createOpenDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createOpenDialog(opts)).not.toThrow();
        });
      });

      describe("createLinkDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createLinkDialog(opts)).not.toThrow();
        });
      });
      //
      describe("createEditDataDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createEditDataDialog(opts)).not.toThrow();
        });
      });
      describe("createChangePageSetup(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createChangePageSetup(opts)).not.toThrow();
        });
      });
      describe("createFilenameDialog(opts)", () => {
        const opts = {};

        it("no throw", () => {
          expect(() => dialog.createFilenameDialog(opts)).not.toThrow();
        });
      });
      describe("createOpenfile(fn)", () => {
        const fn = () => {};

        it("no throw", () => {
          expect(() => dialog.createOpenfile(fn)).not.toThrow();
        });
      });
    });
  });
});
