import * as React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { TxTable } from "./TxTable";

import { transactions } from "../../../mocks";

describe("Transactions Table", () => {
  const refTransaction4 = transactions.filter(
    (t) => t.user.id === "employee4"
  )[0];

  it('should show transaction from user "employee4" with amount "150"', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TxTable data={transactions} />
      </BrowserRouter>
    );
    const amount = getByTestId(`transaction-${refTransaction4.id}-amount`);
    expect(amount).toHaveTextContent("$150.00");
  });

  it('should show transaction from user "employee4" with category "other"', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TxTable data={transactions} />
      </BrowserRouter>
    );
    const cat = getByTestId(`transaction-${refTransaction4.id}-category`);
    expect(cat).toHaveTextContent("other");
  });

  it('should show transaction from user "employee4" with description "cleaningsupplies"', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TxTable data={transactions} />
      </BrowserRouter>
    );
    const desc = getByTestId(`transaction-${refTransaction4.id}-description`);
    expect(desc).toHaveTextContent("cleaningsupplies");
  });
});
