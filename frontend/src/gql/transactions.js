import { gql } from "@apollo/client";

export const GetTransactions = gql`
  query GetTransactions {
    transactions {
      id
      user_id
      description
      merchant_id
      debit
      credit
      amount
    }
  }
`;
