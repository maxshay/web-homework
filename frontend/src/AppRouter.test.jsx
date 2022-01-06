import * as React from "react";
import { render } from "@testing-library/react";
import AppRouter from "./AppRouter";

test("renders home page welcom message", () => {
  const { getByText } = render(<AppRouter />);
  const welcomeMessage = getByText(
    /Please use the left navigation to nativate through the site!/i
  );
  expect(welcomeMessage).toBeInTheDocument();
});

test("renders all links", () => {
  const { getByTestId } = render(<AppRouter />);
  const homeLink = getByTestId("home-link");
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveTextContent("Home");

  const transactionLink = getByTestId("transactions-link");
  expect(transactionLink).toBeInTheDocument();
  expect(transactionLink).toHaveTextContent("Transactions");

  const participantsLink = getByTestId("participants-link");
  expect(participantsLink).toBeInTheDocument();
  expect(participantsLink).toHaveTextContent("Users & Vendors");
});
