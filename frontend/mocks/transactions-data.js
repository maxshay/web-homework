const transactions = [
  {
    id: "5d5c1f747e01cd704f18f863",
    user: {
      firstName: "John",
      id: "employee4",
      lastName: "Johnson",
    },
    description: "cleaningsupplies",
    merchant: {
      id: "b589de2812914e0885112970c979de9f",
      name: "walmart",
    },
    debit: true,
    category: "other",
    credit: false,
    amount: 150,
    insertedAt: "2022-01-02T01:54:36",
    __typename: "Transaction",
  },
  {
    id: "5d5c1f747e01cd704f18f864",
    user: {
      firstName: "James",
      id: "employee3",
      lastName: "Jameson",
    },
    description: "refund",
    merchant: {
      id: "b589de2812914e0885112970c979de9f",
      name: "walmart",
    },
    category: "entertaiment",
    debit: false,
    credit: true,
    amount: 250,
    insertedAt: "2022-01-02T01:54:38",
    __typename: "Transaction",
  },
  {
    id: "5d5c1f747e01cd704f18f865",
    user: {
      firstName: "Dan",
      id: "employee5",
      lastName: "Johnson",
    },
    description: "refund",
    merchant: {
      id: "b589de2812914e0885112970c979de9f",
      name: "walmart",
    },
    category: "transportation",
    debit: false,
    credit: true,
    amount: 100,
    insertedAt: "2022-01-02T01:54:42",
    __typename: "Transaction",
  },
];

export { transactions };
