import { GraphStateReader, PageConfig } from "../../../";
import { editor } from "../../helpers";

describe("EditorGraph", () => {
  let instance;
  const sr = new GraphStateReader(editor);
  beforeEach(() => {
    instance = new PageConfig(sr);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("stateReader", () => {
        it("is set", () => {
          expect(instance.stateReader).toBe(sr);
        });
      });

      describe("node", () => {
        it("is set", () => {
          expect(instance.node).toBe(sr.node);
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBe(sr.graph);
        });
      });

      describe("pageFormat", () => {
        it("is set", () => {
          expect(instance.pageFormat).toBeDefined();
        });
      });

      describe("hasPageSize", () => {
        it("is true", () => {
          expect(instance.hasPageSize).toBeTruthy();
        });
      });

      describe("pageHeight", () => {
        it("is > 0", () => {
          expect(instance.pageHeight).toBeGreaterThan(0);
        });
      });

      describe("pageWidth", () => {
        it("is > 0", () => {
          expect(instance.pageWidth).toBeGreaterThan(0);
        });
      });

      describe("page", () => {
        it("is set", () => {
          expect(instance.page).toBeDefined();
        });
      });

      describe("pageVisible", () => {
        it("is set", () => {
          expect(instance.pageVisible).toBeDefined();
        });
      });

      describe("pageScale", () => {
        it("is set", () => {
          expect(instance.pageScale).toBeDefined();
        });
      });

      describe("nodePageScale", () => {
        it("is set", () => {
          expect(instance.nodePageScale).toBeDefined();
        });
      });
    });
  });

  describe("methods", () => {
    describe("setPageFormat()", () => {
      it("sets page format on graph", () => {
        expect(instance.setPageFormat()).toBeDefined();
      });
    });

    describe("setPageVisibility()", () => {
      it("sets page visibility on graph", () => {
        expect(instance.setPageVisibility()).toBeDefined();
      });
    });

    describe("setPageScale()", () => {
      it("sets page scale on graph", () => {
        expect(instance.setPageScale()).toBeDefined();
      });
    });

    describe("configure()", () => {
      it("configures graph page attributes", () => {
        expect(() => instance.configure()).not.toThrow();
      });
    });
  });
});
