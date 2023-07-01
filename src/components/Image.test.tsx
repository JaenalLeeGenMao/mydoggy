import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act, delay, render, screen } from "utils/test-utils";

import * as dogAPI from "api/dog";

import Image from "./Image";

const IMAGE_ID = "-HgpNnGXl";

describe("render <Image />", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders properly", async () => {
    render(<Image id={IMAGE_ID} alt="pro doggy" />);

    expect(screen.getByTestId(`${IMAGE_ID}-spinner`)).toBeInTheDocument();
    expect(screen.getByTestId(`${IMAGE_ID}-main-img`)).toBeInTheDocument();

    expect(screen.getByTestId(`${IMAGE_ID}-spinner`)).not.toHaveClass("show");
    expect(screen.getByTestId(`${IMAGE_ID}-main-img`)).toHaveClass("show");
  });

  it("will break", async () => {
    vi.spyOn(dogAPI, "getImageById").mockImplementation(
      () =>
        new Promise<any>((resolve) =>
          resolve({
            status: 200,
            statusText: "OK",
            data: {
              id: "-HgpNnGXl",
              url: "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg",
              width: 1920,
              height: 1280,
              breeds: [],
            },
          })
        )
    );

    render(<Image id={IMAGE_ID} alt="pro doggy" />);
    await act(() => delay(500));

    expect(screen.getByTestId(`${IMAGE_ID}-spinner`)).toHaveClass("show");
    expect(screen.getByTestId(`${IMAGE_ID}-main-img`)).not.toHaveClass("show");

    expect(screen.getByTestId(`${IMAGE_ID}-main-img`)).toHaveAttribute(
      "src",
      "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg"
    );
  });
});
