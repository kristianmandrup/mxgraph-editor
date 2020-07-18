import { EventExtractor } from "../../..";
import { EditorUI } from "../../..";

describe("EventExtractor", () => {
  const editor = {};
  const container = document.createElement("div");

  let instance, ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
    instance = new EventExtractor(ui);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBe(ui);
        });
      });
      describe("isTextMode", () => {
        it("is set", () => {
          expect(instance.isTextMode).toBe(true);
        });
      });
    });

    describe("methods", () => {
      describe("zapGremlins(text)", () => {
        const text = "x";
        it("is zapped", () => {
          expect(instance.zapGremlins(text)).toBeDefined();
        });
      });

      describe("setProvider(evt)", () => {
        const evt = { msg: "x" };
        it("provider is set", () => {
          instance.setProvider(evt);
          expect(instance.provider).toBeDefined();
        });
      });

      describe("isCompatibleString(data)", () => {
        const data = "x";
        it("is compatible", () => {
          expect(instance.isCompatibleString(data)).toBeTruthy();
        });
      });

      describe("getData()", () => {
        it("get data", () => {
          expect(instance.getData()).toBeDefined();
        });
      });

      describe("getTextHtml(data?)", () => {
        it("get text html data", () => {
          const data = "x";
          expect(instance.getTextHtml(data)).toBeDefined();
        });
      });

      describe("getTextPlain(data?)", () => {
        it("get text plain data", () => {
          const data = "x";
          expect(instance.getTextPlain(data)).toBeDefined();
        });
      });

      describe("isPlain(data?)", () => {
        it("is plain data", () => {
          const data = "x";
          expect(instance.isPlain(data)).toBeTruthy();
        });
      });

      describe("textData(data?)", () => {
        it("get text data", () => {
          const data = "x";
          expect(instance.textData(data)).toBeDefined();
        });
      });

      describe("htmlData(data?)", () => {
        it("get html data", () => {
          const data = "x";
          expect(instance.htmlData(data)).toBeDefined();
        });
      });

      describe("postProcessData(data?)", () => {
        it("post propcess data", () => {
          const data = "x";
          expect(instance.postProcessData(data)).toBeDefined();
        });
      });

      describe("extractGraphModelFromHtml(data)", () => {
        it("post propcess data", () => {
          const data = "x";
          expect(instance.extractGraphModelFromHtml(data)).toBeDefined();
        });
      });

      describe("extract(evt)", () => {
        const evt = { msg: "hello" };
        it("is extracted", () => {
          expect(instance.extract(evt)).toBeDefined();
        });
      });
    });
  });
});
