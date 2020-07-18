import { EditorUI } from "../..";

describe("EditorUI", () => {
  const editor = {};
  const container = document.createElement("div");

  let ui;
  beforeEach(() => {
    ui = new EditorUI(editor, container);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editor", () => {
        it("is set", () => {
          expect(ui.editor).toBe(editor);
        });
      });

      describe("container", () => {
        it("is set", () => {
          expect(ui.container).toBe(container);
        });
      });

      describe("splitSize", () => {
        it("is > 7", () => {
          expect(ui.splitSize).toBeGreaterThan(7);
        });
      });

      describe("factory", () => {
        it("is set", () => {
          expect(ui.factory).toBeDefined();
        });
      });

      describe("dialogs", () => {
        describe("dialogManager", () => {
          it("is set", () => {
            expect(ui.dialogManager).toBeDefined();
          });
        });

        describe("dialogFactory", () => {
          it("is set", () => {
            expect(ui.dialogFactory).toBeDefined();
          });
        });

        // TODO: put in a dialogMap
        describe("colorDialog", () => {
          it("is set", () => {
            expect(ui.colorDialog).toBeDefined();
          });
        });

        describe("errorDialog", () => {
          it("is set", () => {
            expect(ui.errorDialog).toBeDefined();
          });
        });

        describe("openFileDialog", () => {
          it("is set", () => {
            expect(ui.openFileDialog).toBeDefined();
          });
        });

        describe("imageDialog", () => {
          it("is set", () => {
            expect(ui.imageDialog).toBeDefined();
          });
        });

        describe("linkDialog", () => {
          it("is set", () => {
            expect(ui.linkDialog).toBeDefined();
          });
        });

        describe("editDataDialog", () => {
          it("is set", () => {
            expect(ui.editDataDialog).toBeDefined();
          });
        });

        describe("backgroundImageDialog", () => {
          it("is set", () => {
            expect(ui.backgroundImageDialog).toBeDefined();
          });
        });

        describe("backgroundImageDialog", () => {
          it("is set", () => {
            expect(ui.backgroundImageDialog).toBeDefined();
          });
        });
      });

      describe("uiDisplay", () => {
        it("is set", () => {
          expect(ui.uiDisplay).toBeDefined();
        });
      });

      describe("layouter", () => {
        it("is set", () => {
          expect(ui.layouter).toBeDefined();
        });
      });

      describe("graphExtracter", () => {
        it("is set", () => {
          expect(ui.graphExtracter).toBeDefined();
        });
      });

      describe("undoRedo", () => {
        it("is set", () => {
          expect(ui.undoRedo).toBeDefined();
        });
      });

      describe("splitter", () => {
        it("is set", () => {
          expect(ui.splitter).toBeDefined();
        });
      });

      describe("pageConfig", () => {
        it("is set", () => {
          expect(ui.pageConfig).toBeDefined();
        });
      });

      // menubarHeight
      // formatEnabled
      // formatWidth
      // toolbarHeight
      // footerHeight
      // sidebarFooterHeight
      // hsplitPosition
      // allowAnimation
      // lightboxMaxFitScale
      // lightboxVerticalDivider
      // hsplitClickEnabled
      // zeroOffset
      // altShiftActions
    });

    describe("methods", () => {
      // createMenus
      // init(url)
      // onOpen
      // fireEvent(_event)
      // setBackgroundColor(value)
      // setFoldingEnabled(value)
      // setPageFormat(value)
      // setPageScale(value)
      // setGridColor(value)
      // addUndoListener()
      // getDiagramContainerOffset()
      // createDivs()
      // createSidebarFooterContainer()
      // createUi()
      // addSplitHandler(elt, horizontal, dx, onChange)
      // handleError(resp, title, fn, invokeFnOnClose, _notFoundMessage)
      // showError(opts)
      // showDialog(opts)
      // hideDialog(cancel, isEsc?)
      // pickColor(color, apply)
      // openFile()
      // extractGraphModelFromHtml(data)
      // extractGraphModelFromEvent(evt)
      // isCompatibleString(_data)
      // showFileNameDialog()
      // executeLayout(exec, animate, post)
      // showImageDialog(title, value, fn, _ignoreExisting)
      // showLinkDialog(value, btnLabel, fn)
      // showDataDialog(cell)
      // showBackgroundImageDialog(apply)
      // setBackgroundImage(image)
      // confirm(msg, okFn, cancelFn)
      // createOutline(_wnd)
      // destroy()
      // getEditBlankXml()
      // getUrl(pathname)
      // - ScrollBarsManager
      // setScrollbars(value)
      // hasScrollbars()
      // resetScrollbars()
      // setPageVisible(value)
    });
  });
});
