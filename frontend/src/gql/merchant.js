import { gql } from "@apollo/client";

export const GetMerchant = gql`
  query GetMerchant($id: ID!) {
    merchant(id: $id) {
      id
      name
      description
      insertedAt
      transactions {
        id
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

export const SearchMerchants = gql`
  query SearchMerchants($query: String!) {
    searchMerchants(query: $query) {
      id
      name
      description
    }
  }
`;
