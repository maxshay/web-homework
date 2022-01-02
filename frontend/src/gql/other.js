import { gql } from "@apollo/client";

export const GetAllPeople = gql`
  query GetAllPeople {
    merchants {
      id
      name
      description
      insertedAt
    }
    users {
      id
      firstName
      lastName
      dob
      insertedAt
    }
  }
`;
