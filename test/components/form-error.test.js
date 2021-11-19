import React from "react";
import { render, screen } from "@testing-library/react";
import FormError from "~/components/form-error";

describe("FormError", () => {
  it("renders an error message", () => {
    const error = {
      message: "foo",
    };

    render(<FormError error={error} />);

    const errorNode = screen.getByText(/foo/);

    expect(errorNode).toBeInTheDocument();
  });
});
