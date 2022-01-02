import { gql } from "@apollo/client";

export const GetUser = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      insertedAt
      dob

      transactions {
        id
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
