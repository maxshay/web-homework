import * as React from "react";
import { render } from "@testing-library/react";
import AppRouter from "./AppRouter";

test("renders learn react link", () => {
  const { getByText } = render(<AppRouter />);
  const linkElement = getByText(
    /Please use the left navigation to nativate through the site!/i
  );
  expect(linkElement).toBeInTheDocument();
});
