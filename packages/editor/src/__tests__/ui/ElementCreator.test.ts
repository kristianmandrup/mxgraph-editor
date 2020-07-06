import { EditorUI, ElementCreator } from "../../";

describe("Splitter", () => {
  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI();
    instance = new ElementCreator(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBe(ui);
        });
      });

      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createDivs()", () => {
        it("no throw", () => {
          expect(() => instance.createDivs()).not.toThrow();
        });
      });

      describe("createTabContainer()", () => {
        it("no throw", () => {
          expect(() => instance.createTabContainer()).not.toThrow();
        });
      });

      describe("createSidebarFooterContainer()", () => {
        it("no throw", () => {
          expect(() => instance.createSidebarFooterContainer()).not.toThrow();
        });
      });

      describe("createDiv(classname)", () => {
        const classname = "a";
        it("no throw", () => {
          expect(() => instance.createDiv(classname)).not.toThrow();
        });
      });
    });
  });
});
