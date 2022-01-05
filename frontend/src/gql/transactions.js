import { gql } from "@apollo/client";

export const GetTransactions = gql`
  query GetTransactions {
    transactions {
      id
      userId
      description
      merchantId
      merchant {
        name
      }
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
export const GetTransaction = gql`
  query GetTransaction($id: ID!) {
    transaction(id: $id) {
      id
      amount
      credit
      debit
      description
      merchant {
        id
        name
      }
      user {
        id
      }
    }
  }
`;

export const UpdateTransaction = gql`
  mutation UpdateTransaction(
    $amount: Int!
    $credit: Boolean!
    $debit: Boolean!
    $description: String!
    $id: ID!
    $merchantId: ID!
    $userId: ID!
  ) {
    updateTransaction(
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
      id: $id
      merchantId: $merchantId
      userId: $userId
    ) {
      id
    }
  }
`;

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
