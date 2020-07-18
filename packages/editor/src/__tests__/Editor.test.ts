import { Editor } from "../editor";

describe("Editor", () => {
  const chromeless = true;
  const themes = [];
  const mode = "x";
  const editable = true;
  const graph = {};

  let editor;
  beforeEach(() => {
    editor = new Editor(chromeless, themes, mode, graph, editable);
  });

  describe("static", () => {
    describe("properties", () => {
      describe("pageCounter", () => {
        it("is set", () => {
          expect(Editor.pageCounter).toEqual(0);
        });
      });

      describe("useLocalStorage", () => {
        it("is set", () => {
          expect(Editor.useLocalStorage).toBeDefined();
        });
      });

      describe("ctrlKey", () => {
        it("is set", () => {
          expect(Editor.useLocalStorage).toBeDefined();
        });
      });

      describe("hintOffset", () => {
        it("is set", () => {
          expect(Editor.hintOffset).toEqual(20);
        });
      });

      describe("popupsAllowed", () => {
        it("is set", () => {
          expect(Editor.popupsAllowed).toBeTruthy();
        });
      });
    });
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("undoMgr", () => {
        it("is undefined", () => {
          expect(editor.undoMgr).toBeUndefined();
        });
      });

      describe("originalNoForeignObject", () => {
        it("is set", () => {
          expect(editor.originalNoForeignObject).toBeDefined();
        });
      });

      describe("transparentImage", () => {
        it("is set", () => {
          expect(editor.transparentImage).toBeDefined();
        });
      });

      describe("extendCanvas", () => {
        it("is true", () => {
          expect(editor.extendCanvas).toBeTruthy();
        });
      });

      describe("chromeless", () => {
        it("is false", () => {
          expect(editor.chromeless).toBeFalsy();
        });
      });

      describe("cancelFirst", () => {
        it("is true", () => {
          expect(editor.cancelFirst).toBeTruthy();
        });
      });

      describe("enabled", () => {
        it("is true", () => {
          expect(editor.enabled).toBeTruthy();
        });
      });

      describe("filename", () => {
        it("is null", () => {
          expect(editor.filename).toBeNull();
        });
      });

      describe("modified", () => {
        it("is true", () => {
          expect(editor.modified).toBeTruthy();
        });
      });

      describe("autosave", () => {
        it("is true", () => {
          expect(editor.autosave).toBeTruthy();
        });
      });

      describe("initialTopSpacing", () => {
        it("is 0", () => {
          expect(editor.initialTopSpacing).toEqual(0);
        });
      });

      describe("appName", () => {
        it("is set", () => {
          expect(editor.appName).toBeDefined();
        });
      });

      describe("editBlankUrl", () => {
        it("is set", () => {
          expect(editor.editBlankUrl).toBeDefined();
        });
      });

      describe("defaultGraphOverflow", () => {
        it("is hidden", () => {
          expect(editor.defaultGraphOverflow).toEqual("hidden");
        });
      });

      describe("urlParams", () => {
        it("is set", () => {
          expect(editor.urlParams).toBeTruthy();
        });
      });

      describe("editable", () => {
        it("is set", () => {
          expect(editor.editable).toBeTruthy();
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(editor.graph).toBeDefined();
        });
      });

      describe("undoManager", () => {
        it("is set", () => {
          expect(editor.undoManager).toBeDefined();
        });
      });

      describe("status", () => {
        it("is set", () => {
          expect(editor.status).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("getOrCreateFilename()", () => {
        it("is a filename", () => {
          expect(editor.getOrCreateFilename()).toBeDefined();
        });
      });

      describe("getFilename()", () => {
        it("is filename", () => {
          expect(editor.getFilename()).toEqual(editor.filename);
        });
      });

      describe("setStatus(value)", () => {
        it("sets status", () => {
          const value = "x";
          editor.setStatus(value);
          expect(editor.status).toEqual(value);
        });
      });

      describe("dispatch(event)", () => {
        it("dispatches", () => {
          const event = { name: "x", msg: "hello" };
          expect(() => editor.dispatch(event)).not.toThrow();
        });
      });

      describe("getStatus()", () => {
        it("is status", () => {
          expect(editor.getStatus()).toEqual(editor.status);
        });
      });

      describe("graphChangeListener(sender, eventObject)", () => {
        it("no throw", () => {
          const sender = {},
            eventObject = {};
          expect(() =>
            editor.graphChangeListener(sender, eventObject)
          ).not.toThrow();
        });
      });

      describe("addChangeListener()", () => {
        it("no throw", () => {
          expect(() => editor.addChangeListener()).not.toThrow();
        });
      });

      describe("setup()", () => {
        it("no throw", () => {
          expect(() => editor.setup()).not.toThrow();
        });
      });

      describe("init()", () => {
        it("no throw", () => {
          expect(() => editor.init()).not.toThrow();
        });
      });

      describe("isChromelessView()", () => {
        it("is chromeless - true", () => {
          expect(editor.isChromelessView()).toEqual(editor.chromeless);
        });
      });

      describe("setAutosave(value)", () => {
        it("is chromeless - true", () => {
          const value = true;
          editor.setAutosave(value);
          expect(editor.autosave).toEqual(value);
        });
      });

      describe("getEditBlankUrl(params)", () => {
        it("is blank url with params", () => {
          const params = "&page=2";
          expect(editor.getEditBlankUrl(params)).toEqual(
            editor.editBlankUrl + params
          );
        });
      });

      describe("editAsNew(xml, title)", () => {
        it("no throw", () => {
          const xml = "",
            title = "hello";
          expect(() => editor.editAsNew(xml, title)).not.toThrow();
        });
      });

      describe("createGraph(themes, model)", () => {
        it("creates graph", () => {
          const themes = [],
            model = {};
          expect(() => editor.createGraph(themes, model)).not.toThrow();
        });
      });

      describe("resetGraph()", () => {
        it("resets graph", () => {
          expect(() => editor.resetGraph()).not.toThrow();
        });
      });

      describe("readGraphState(node)", () => {
        it("reads graph state", () => {
          const node = {};
          expect(editor.readGraphState(node)).toBeDefined();
        });
      });

      describe("setGraphXml(node)", () => {
        it("sets graph xml for node", () => {
          const node = {};
          expect(() => editor.setGraphXml(node)).not.toThrow();
        });
      });

      describe("fireEvent(event)", () => {
        it("fires event - no throw", () => {
          const event = { msg: "hello" };
          expect(() => editor.fireEvent(event)).not.toThrow();
        });
      });

      describe("getGraphXml(ignoreSelection)", () => {
        describe("ignoreSelection = false", () => {
          it("gets graph xml with current selection included", () => {
            const ignoreSelection = false;
            expect(editor.getGraphXml(ignoreSelection)).toBeDefined();
          });
        });

        describe("ignoreSelection = true", () => {
          it("gets graph xml with current selection EXcluded", () => {
            const ignoreSelection = true;
            expect(editor.getGraphXml(ignoreSelection)).not.toThrow();
          });
        });
      });

      describe("updateGraphComponents()", () => {
        it("updates graph components", () => {
          expect(() => editor.updateGraphComponents()).not.toThrow();
        });
      });

      describe("setModified(value)", () => {
        it("sets modified with value", () => {
          const value = "x";
          expect(() => editor.setModified(value)).not.toThrow();
        });
      });

      describe("setFilename(value)", () => {
        it("sets filename with value - no throw", () => {
          const value = "x";
          expect(() => editor.setFilename(value)).not.toThrow();
        });
      });

      // Keeps the selection in sync with the history
      describe("undoListener(sender, evt)", () => {
        it("no throw", () => {
          const sender = {},
            evt = {};
          expect(() => editor.undoListener(sender, evt)).not.toThrow();
        });
      });

      describe("listener(sender, evt)", () => {
        it("no throw", () => {
          const sender = {},
            evt = {};
          expect(() => editor.listener(sender, evt)).not.toThrow();
        });
      });

      describe("undoHandler(sender, evt)", () => {
        it("no throw", () => {
          const sender = {},
            evt = {};
          expect(() => editor.undoHandler(sender, evt)).not.toThrow();
        });
      });

      describe("addCell(cells, cell)", () => {
        it("adds cell to cells - no throw", () => {
          const cells = [],
            cell = { name: "x" };
          expect(() => editor.addCell(cells, cell)).not.toThrow();
        });
      });

      describe("createUndoManager()", () => {
        it("creates undo manager", () => {
          expect(editor.createUndoManager()).toBeDefined();
        });
      });

      describe("initStencilRegistry()", () => {
        it("initializes stencil registry - no throw", () => {
          expect(() => editor.initStencilRegistry()).not.toThrow();
        });
      });

      describe("destroy()", () => {
        it("destroys - no throw", () => {
          expect(() => editor.destroy()).not.toThrow();
        });
      });

      describe("getPosition(left, top)", () => {
        it("gets position", () => {
          const left = 0,
            top = 0;
          expect(editor.getPosition(left, top)).toBeDefined();
        });
      });

      describe("close(cancel, isEsc)", () => {
        describe("isEsc = false", () => {
          it("closes editor - no throw", () => {
            const cancel = () => {},
              isEsc = false;
            expect(() => editor.close(cancel, isEsc)).not.toThrow();
          });
        });

        describe("isEsc = true", () => {
          it("closes editor - no throw", () => {
            const cancel = () => {},
              isEsc = true;
            expect(() => editor.close(cancel, isEsc)).not.toThrow();
          });
        });
      });
    });
  });
});
