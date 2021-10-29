import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "~/pages/index";

describe("Home", () => {
  it.todo("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /animal adoption dating app/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
