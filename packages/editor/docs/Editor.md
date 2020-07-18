# Editor

The `Editor` class controls the underlying editor mechanics.

## Main components

- `undoManager` to control undo/redo operations
- `status`
- `modified` whether editor has been modified since last save
- `filename`
- `changeListener` listener that reacts to changes
- `autosave` mode on/off
- `graph` the underlying node graph
- `close` to close the editor
