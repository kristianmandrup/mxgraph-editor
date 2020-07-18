import { EditorSetup } from "../../../editor";
import { editor } from "../helpers";

describe("EditorSetup", () => {
  let instance;
  beforeEach(() => {
    instance = new EditorSetup();
  });

  describe("instance", () => {
    describe("methods", () => {
      describe("setup()", () => {
        it("no throw", () => {
          expect(() => instance.setup()).not.toThrow();
        });
      });

      describe("incrementPageCounter(op)", () => {
        it("no throw", () => {
          const op = {};
          expect(() => instance.incrementPageCounter(op)).not.toThrow();
        });
      });

      describe("isOpen(op)", () => {
        it("no throw", () => {
          const op = {};
          expect(() => instance.isOpen(op)).not.toThrow();
        });
      });
    });
  });
});
