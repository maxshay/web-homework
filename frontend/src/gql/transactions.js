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
        lastName
      }
    }
  }
`;

// TODO: get a transaction

export const DeleteTransaction = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
      amount
      description
    }
  }
`;

export const CreateTransaction = gql`
  mutation CreateTransaction(
    $amount: Int!
    $credit: Boolean!
    $debit: Boolean!
    $description: String!
    $merchantId: ID!
    $userId: ID!
  ) {
    createTransaction(
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
      merchantId: $merchantId
      userId: $userId
    ) {
      id
      amount
      description
    }
  }
`;
