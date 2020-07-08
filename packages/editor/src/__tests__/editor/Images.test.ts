import { Undo } from "../../../editor";
import { editor } from "../helpers";

describe("Undo", () => {
  let instance;
  beforeEach(() => {
    instance = new Undo(editor);
  });

  describe("static", () => {
    describe("properties", () => {
      describe("editor", () => {
        it("is set", () => {
          expect(instance.editor).toBe(editor);
        });
      });
    });
  });
});

// transparentImage
// moveImage
// helpImage
// checkmarkImage
// maximizeImage
// zoomOutImage
// zoomInImage
// zoomFitImage
// layersImage
// previousImage
// nextImage
// editImage
// zoomOutLargeImage
// zoomInLargeImage
// actualSizeLargeImage
// printLargeImage
// layersLargeImage
// closeLargeImage
// editLargeImage
// previousLargeImage
// nextLargeImage
// refreshLargeImage
// backLargeImage
// fullscreenLargeImage
