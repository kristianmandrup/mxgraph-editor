import mx from "@mxgraph-app/mx";
const { mxPoint, mxEvent } = mx;

export class SplitHandler {
  elem: any;
  horizontal: any;
  dx: number;
  onChange: any;
  footerHeight: any;
  hsplitClickEnabled: any;
  initial: any;
  start: any;
  last: any;
  ignoreClick: any;
  destroyFunctions: any[] = [];

  constructor({
    initial,
    start,
    last,
    footerHeight,
    hsplitClickEnabled,
    elem,
    horizontal,
    dx,
    onChange,
    ignoreClick,
    destroyFunctions,
  }: any = {}) {
    // this.splitter = splitter;
    this.footerHeight = footerHeight;
    this.hsplitClickEnabled = hsplitClickEnabled;
    this.elem = elem;
    this.horizontal = horizontal;
    this.dx = dx;
    this.onChange = onChange;
    this.destroyFunctions = destroyFunctions;

    this.start = start;
    this.initial = initial;
    this.ignoreClick = ignoreClick;
    this.last = last;
  }

  getValue = () => {
    const { horizontal, dx, elem, footerHeight } = this;
    const { style } = elem;
    var result = parseInt(horizontal ? style.left : style.bottom);

    // Takes into account hidden footer
    if (!horizontal) {
      result = result + dx - footerHeight;
    }

    return result;
  };

  moveHandler = (evt) => {
    const { start, onChange, initial, getValue, horizontal, dx } = this;
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
        this.ignoreClick = true;
        this.last = null;
      }
    }
  };

  dropHandler = (evt) => {
    const { moveHandler } = this;
    moveHandler(evt);
    this.initial = null;
    this.start = null;
  };

  addHandlers() {
    const {
      addGestureListener,
      addClickListener,
      addGestureMoveDrop,
      addMoveDropDestroyer,
    } = this;

    addGestureListener();
    addClickListener();
    addGestureMoveDrop();
    addMoveDropDestroyer();
  }

  addGestureListener() {
    const { elem, getValue } = this;
    mxEvent.addGestureListeners(
      elem,
      (evt) => {
        this.start = new mxPoint(
          mxEvent.getClientX(evt),
          mxEvent.getClientY(evt)
        );
        this.initial = getValue();
        this.ignoreClick = false;
        mxEvent.consume(evt);
      },
      null,
      null
    );
  }

  addClickListener() {
    const {
      onChange,
      dx,
      last,
      getValue,
      ignoreClick,
      hsplitClickEnabled,
      elem,
    } = this;
    mxEvent.addListener(elem, "click", (evt) => {
      if (!ignoreClick && hsplitClickEnabled) {
        var next = last != null ? last - dx : 0;
        this.last = getValue();
        onChange(next);
        mxEvent.consume(evt);
      }
    });
  }

  addGestureMoveDrop() {
    const { moveHandler, dropHandler } = this;
    mxEvent.addGestureListeners(document, null, moveHandler, dropHandler);
  }

  addMoveDropDestroyer() {
    const { moveHandler, dropHandler } = this;
    this.destroyFunctions.push(function () {
      mxEvent.removeGestureListeners(document, null, moveHandler, dropHandler);
    });
  }
}
