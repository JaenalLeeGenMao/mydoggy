import { describe, it, expect } from "vitest";
import { render, screen } from "utils/test-utils";

import LandingPage from "./index";

describe("renders landing page", () => {
  it("renders", () => {
    render(<LandingPage />);

    expect(screen.queryByText(/Welcome to Home page/i)).toBeInTheDocument();
  });
});
