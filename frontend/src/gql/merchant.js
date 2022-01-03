import { gql } from "@apollo/client";

export const GetMerchant = gql`
  query GetMerchant($id: ID!) {
    merchant(id: $id) {
      id
      name
      description
      insertedAt
      transactions {
        amount
        debit
        credit
        category
        insertedAt
      }
    }
  }
`;

export const GetMerchants = gql`
  query GetMerchants {
    merchants {
      id
      name
    }
  }
`;
