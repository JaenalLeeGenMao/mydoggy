import { describe, it, expect } from "vitest";
import { stringify } from "./querystring";

describe("test functionality of stringify", () => {
  it("filters out empty string", () => {
    expect(
      stringify({
        first_name: "jae",
        last_name: "nal",
      })
    ).toBe("first_name=jae&last_name=nal");

    expect(
      stringify({
        first_name: "jae",
        last_name: "",
      })
    ).toBe("first_name=jae");

    expect(
      stringify({
        first_name: "jae",
        last_name: null,
      })
    ).toBe("first_name=jae&last_name");

    expect(
      stringify({
        first_name: "jae",
        last_name: undefined,
      })
    ).toBe("first_name=jae");
  });
});
