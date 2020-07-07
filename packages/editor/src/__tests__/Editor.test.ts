import { Editor } from "../";

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

      // editable: boolean;
      // graph: any;
      // undoManager: any;
      // status: string;
    });

    describe("methods", () => {
      // getOrCreateFilename()
      // getFilename()
      // setStatus(value)
      // dispatch(_event)
      // getStatus()
      // graphChangeListener(_sender, eventObject)
      // addChangeListener()
      // setup()
      // init()
      // isChromelessView()
      // setAutosave(value)
      // getEditBlankUrl(params)
      // editAsNew(xml, title)
      // createGraph(themes, model)
      // resetGraph()
      // readGraphState(node)
      // setGraphXml(node)
      // fireEvent(_event)
      // getGraphXml(ignoreSelection)
      // updateGraphComponents()
      // setModified(value)
      // setFilename(value)
      // undoListener(_sender, evt)
      // listener(_sender, _evt)
      // undoHandler(_sender, evt)
      // addCell(cells, cell)
      // createUndoManager()
      // initStencilRegistry()
      // destroy()
      // getPosition(left, top)
      // close(cancel, isEsc)
    });
  });
});
