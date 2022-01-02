import { gql } from "@apollo/client";

export const GetMerchant = gql`
  query GetMerchant($id: ID!) {
    merchant(id: $id) {
      id
      name
      transactions {
        amount
        description
        debit
        credit
        category
        insertedAt
      }
    }
  }
`;
