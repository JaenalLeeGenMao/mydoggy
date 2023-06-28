import {
  describe,
  it,
  expect,
  // vi
} from "vitest";
import * as api from "./api";

// vi.mock("axios");

describe("axios utility", () => {
  it("mock getApi", async () => {
    // vi.spyOn(api, "getApi").mockImplementation(
    //   () =>
    //     new Promise<any>((resolve) =>
    //       resolve({
    //         status: 200,
    //         statusText: "OK",
    //         data: "GET",
    //       })
    //     )
    // );

    const response = api.getApi("/hello", {
      headers: {
        "User-Agent": "captain-doggy",
      },
    });
    await response
      .then((dt) => {
        expect(dt.data).toBe("GET");
      })
      .catch((e) => {
        expect(e.response.status).toEqual(404);
      });
  });

  it("mock postApi", async () => {
    // vi.spyOn(api, "postApi").mockImplementation(
    //   () =>
    //     new Promise<any>((resolve) =>
    //       resolve({
    //         status: 200,
    //         statusText: "OK",
    //         data: "POST",
    //       })
    //     )
    // );
    const response = api.postApi("/hello", {
      headers: {
        "User-Agent": "captain-doggy",
      },
      body: {
        name: "kokonut",
      },
    });
    await response
      .then((dt) => {
        expect(dt.data).toBe("POST");
      })
      .catch((e) => {
        expect(e.response.status).toEqual(404);
      });
  });

  it("mock patchApi", async () => {
    // vi.spyOn(api, "patchApi").mockImplementation(
    //   () =>
    //     new Promise<any>((resolve) =>
    //       resolve({
    //         status: 200,
    //         statusText: "OK",
    //         data: "PATCH",
    //       })
    //     )
    // );
    const response = api.patchApi("/hello", {
      headers: {
        "User-Agent": "captain-doggy",
      },
      body: {
        name: "kokonut",
      },
    });
    await response
      .then((dt) => {
        expect(dt.data).toBe("PATCH");
      })
      .catch((e) => {
        expect(e.response.status).toEqual(404);
      });
  });

  it("mock putApi", async () => {
    // vi.spyOn(api, "putApi").mockImplementation(
    //   () =>
    //     new Promise<any>((resolve) =>
    //       resolve({
    //         status: 200,
    //         statusText: "OK",
    //         data: "PUT",
    //       })
    //     )
    // );
    const response = api.putApi("/hello", {
      headers: {
        "User-Agent": "captain-doggy",
      },
      body: {
        name: "kokonut",
      },
    });
    await response
      .then((dt) => {
        expect(dt.data).toBe("PUT");
      })
      .catch((e) => {
        expect(e.response.status).toEqual(404);
      });
  });

  it("mock deleteApi", async () => {
    // vi.spyOn(api, "deleteApi").mockImplementation(
    //   () =>
    //     new Promise<any>((resolve) =>
    //       resolve({
    //         status: 200,
    //         statusText: "OK",
    //         data: "DELETE",
    //       })
    //     )
    // );
    const response = api.deleteApi("/hello", {
      headers: {
        "User-Agent": "captain-doggy",
      },
      body: {
        name: "kokonut",
      },
    });

    await response
      .then((dt) => {
        expect(dt.data).toBe("DELETE");
      })
      .catch((e) => {
        expect(e.response.status).toEqual(404);
      });
  });
});
