# mxgraph-editor

To extend mxgraph classes for use with TypeScript, use the [simple inheritance](https://johnresig.com/blog/simple-javascript-inheritance/) by John Resig

```ts
import { Class } from "./Class";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxCellEditor = Class.extend({
  documentMode: document["documentMode"],

  init: function (graph) {
    mxCellEditor.apply(this, [graph]);
  },

  getMinimumSize: function (state) {
    const { graph } = this;
    var scale = graph.getView().scale;

    return new mxRectangle(
      0,
      0,
      state.text == null ? 30 : state.text.size * scale + 20,
      30
    );
  },
}
```

To call inherited functions, use this pattern

```ts
  applyValue: function (state, value) {
    const { graph } = this;
    const mxCellEditorApplyValue = mxCellEditor.prototype.applyValue;
    // Removes empty relative child labels in edges
    graph.getModel().beginUpdate();

    mxCellEditorApplyValue.apply(this, [state, value]);
  }
```
