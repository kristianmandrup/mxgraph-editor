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
      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBe(editor);
        });
      });

      // node
      // graph
      // pageFormat
      // hasPageSize
      // pageHeight
      // pageWidth
      // page
      // pageVisible
      // pageScale
      // ps
    });
  });

  describe("methods", () => {
    // setPageFormat();
    // setPageVisibility()
    // setPageScale()

    describe("configure()", () => {
      it("configures graph page attributes", () => {
        expect(instance.configure()).toBeDefined();
      });
    });
  });
});
