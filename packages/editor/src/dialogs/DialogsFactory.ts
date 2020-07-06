// import {
//   ErrorDialog,
//   Dialog,
//   ColorDialog,
//   OpenDialog,
//   LinkDialog,
//   EditDataDialog,
//   ChangePageSetup,
//   FilenameDialog,
//   Openfile,
// } from "@mxgraph-app/dialogs";

export class DialogsFactory {
  ui: any;
  classMap: any;

  constructor(ui, classMap: any = {}) {
    this.ui = ui;
    this.classMap = classMap;
  }

  createErrorDialog(opts): any {
    const { ErrorDialog } = this.classMap;
    return new ErrorDialog(this, opts);
  }

  createDialog(opts): any {
    const { Dialog } = this.classMap;
    return new Dialog(this, opts);
  }

  createColorDialog(opts): any {
    const { ColorDialog } = this.classMap;
    return new ColorDialog(this, opts);
  }

  createOpenDialog(opts): any {
    const { OpenDialog } = this.classMap;
    return new OpenDialog(this, opts);
  }

  createLinkDialog(opts): any {
    const { LinkDialog } = this.classMap;
    return new LinkDialog(this, opts);
  }

  createEditDataDialog(opts): any {
    const { EditDataDialog } = this.classMap;
    return new EditDataDialog(this, opts);
  }

  createChangePageSetup(opts): any {
    const { ChangePageSetup } = this.classMap;
    return new ChangePageSetup(this, opts);
  }

  createFilenameDialog(opts): any {
    const { FilenameDialog } = this.classMap;
    return new FilenameDialog(this, opts);
  }

  createOpenfile(opts): any {
    const { Openfile } = this.classMap;
    return new Openfile(this, opts);
  }
}
