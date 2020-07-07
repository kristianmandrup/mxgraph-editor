import { UndoManagerFactory } from "../../../editor";
import { editor } from "../helpers";

describe("UndoManagerFactory", () => {
  let instance;
  beforeEach(() => {
    instance = new UndoManagerFactory(editor);
  });
});
