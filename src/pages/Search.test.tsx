import react from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  act,
  delay,
  fireEvent,
  render,
  screen,
  userEvent,
} from "utils/test-utils";

import SearchPage, { ErrorBoundary } from "./Search";

const getInputField = () => screen.getByTestId("search-input-field");
const getFilterLimit = () => screen.getByTestId("search-filter-limit");
const getFilterSortby = () => screen.getByTestId("search-filter-sortby");
const getPrevBtn = () => screen.getByTestId("search-btn-prev");
const getNextBtn = () => screen.getByTestId("search-btn-next");

describe("renders Search page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("renders", async () => {
    render(<SearchPage />);

    await userEvent.type(getInputField(), "pomeranian");
    await act(() => delay(1000));

    await userEvent.click(getNextBtn());
    await act(() => delay(0));

    await userEvent.click(getPrevBtn());
    await act(() => delay(0));

    const dummyFn = vi.fn();
    getFilterLimit().onchange = dummyFn;
    fireEvent.change(getFilterLimit(), { target: { value: 25 } });
    expect(dummyFn).toBeCalledTimes(1);

    getFilterSortby().onchange = dummyFn;
    fireEvent.change(getFilterSortby(), { target: { value: "height" } });
    expect(dummyFn).toBeCalledTimes(2);
    fireEvent.change(getFilterSortby(), { target: { value: "life_span" } });
    expect(dummyFn).toBeCalledTimes(3);
  });
});

describe("Search page renders ErrorBoundary", () => {
  it("render Error Boundary", () => {
    const { container } = render(<ErrorBoundary />);
    expect(container).toHaveTextContent("Search page is down");
  });
});
