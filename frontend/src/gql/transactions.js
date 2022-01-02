import { gql } from "@apollo/client";

export const GetTransactions = gql`
  query GetTransactions {
    transactions {
      id
      userId
      description
      merchantId
      debit
      credit
      amount
      category
      insertedAt
      user {
        firstName
      }
    }
  }
`;
