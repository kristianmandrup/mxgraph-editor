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

  describe("instance", () => {});
});
