import mx from "@mxgraph-app/mx";
import resources from "@mxgraph-app/resources";
const { mxXmlRequest, mxUtils, mxResources } = mx;
const { SAVE_URL, MAX_REQUEST_SIZE } = resources;

export class FileSaver {
  ui: any;

  constructor(ui) {
    this.ui = ui;
  }

  get graph() {
    return this.ui.graph;
  }

  get editor() {
    return this.ui.editor;
  }

  get useLocalStorage() {
    return false;
    // return Editor.useLocalStorage
  }

  updateDocumentTitle() {}

  /**
   * Adds the label menu items to the given menu and parent.
   */
  saveFile(forceDialog) {
    if (!forceDialog && this.editor.filename != null) {
      this.save(this.editor.getOrCreateFilename());
    } else {
    }
  }

  /**
   * Saves the current graph under the given filename.
   */
  save(name) {
    const { graph, useLocalStorage } = this;
    if (name != null) {
      if (graph.isEditing()) {
        graph.stopEditing();
      }

      var xml = mxUtils.getXml(this.editor.getGraphXml());

      try {
        if (useLocalStorage) {
          if (
            localStorage.getItem(name) != null &&
            !mxUtils.confirm(mxResources.get("replaceIt", [name]))
          ) {
            return;
          }

          localStorage.setItem(name, xml);
          this.editor.setStatus(
            mxUtils.htmlEntities(mxResources.get("saved")) + " " + new Date()
          );
        } else {
          if (xml.length < MAX_REQUEST_SIZE) {
            const req = new mxXmlRequest(
              SAVE_URL,
              "filename=" +
                encodeURIComponent(name) +
                "&xml=" +
                encodeURIComponent(xml),
              null,
              null,
              null,
              null
            );
            req.simulate(document, "_blank");
          } else {
            mxUtils.alert(mxResources.get("drawingTooLarge"));
            mxUtils.popup(xml);

            return;
          }
        }

        this.editor.setModified(false);
        this.editor.setFilename(name);
        this.updateDocumentTitle();
      } catch (e) {
        this.editor.setStatus(
          mxUtils.htmlEntities(mxResources.get("errorSavingFile"))
        );
      }
    }
  }
}
