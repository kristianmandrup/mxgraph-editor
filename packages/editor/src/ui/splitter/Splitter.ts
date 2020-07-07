import mx from "@mxgraph-app/mx";
const { mxPoint, mxEvent, mxClient } = mx;

export class Splitter {
  ui: any;
  footerHeight: any;
  hsplitClickEnabled: any;
  destroyFunctions: any;

  constructor(ui) {
    this.ui = ui;
    this.footerHeight = ui.footerHeight;
    this.hsplitClickEnabled = ui.hsplitClickEnabled;
    this.destroyFunctions = ui.destroyFunctions;
  }

  /**
   * Updates the states of the given undo/redo items.
   */
  addSplitHandler(elt, horizontal, dx, onChange) {
    var start: any;
    var initial: any;
    var ignoreClick: any;
    var last: any;

    // Disables built-in pan and zoom in IE10 and later
    if (mxClient.IS_POINTER) {
      elt.style.touchAction = "none";
    }

    var getValue = () => {
      var result = parseInt(horizontal ? elt.style.left : elt.style.bottom);

      // Takes into account hidden footer
      if (!horizontal) {
        result = result + dx - this.footerHeight;
      }

      return result;
    };

    const moveHandler = (evt) => {
      if (start != null) {
        var pt = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        onChange(
          Math.max(
            0,
            initial + (horizontal ? pt.x - start.x : start.y - pt.y) - dx
          )
        );
        mxEvent.consume(evt);

        if (initial != getValue()) {
          ignoreClick = true;
          last = null;
        }
      }
    };

    function dropHandler(evt) {
      moveHandler(evt);
      initial = null;
      start = null;
    }

    mxEvent.addGestureListeners(
      elt,
      (evt) => {
        start = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        initial = getValue();
        ignoreClick = false;
        mxEvent.consume(evt);
      },
      null,
      null
    );

    mxEvent.addListener(elt, "click", (evt) => {
      if (!ignoreClick && this.hsplitClickEnabled) {
        var next = last != null ? last - dx : 0;
        last = getValue();
        onChange(next);
        mxEvent.consume(evt);
      }
    });

    mxEvent.addGestureListeners(document, null, moveHandler, dropHandler);

    this.destroyFunctions.push(function () {
      mxEvent.removeGestureListeners(document, null, moveHandler, dropHandler);
    });
  }
}
