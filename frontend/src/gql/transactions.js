import { gql } from "@apollo/client";

export const GetAllTransactions = gql`
  query GetAllTransactions {
    transactions {
      id
      userId
      description
      merchantId
      merchant {
        id
        name
      }
      debit
      credit
      amount
      category
      insertedAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GetTransactions = gql`
  query GetTransactions(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    listTransactions(
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          userId
          description
          merchantId
          merchant {
            id
            name
          }
          debit
          credit
          amount
          category
          insertedAt
          user {
            id
            firstName
            lastName
          }
        }
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
      category
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
    $category: String!
    $id: ID!
    $merchantId: ID!
    $userId: ID!
  ) {
    updateTransaction(
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
      category: $category

      id: $id
      merchantId: $merchantId
      userId: $userId
    ) {
      id
      amount
      description
      debit
      credit
      category
      insertedAt
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
    $category: String!
    $merchantId: ID!
    $userId: ID!
  ) {
    createTransaction(
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
      category: $category
      merchantId: $merchantId
      userId: $userId
    ) {
      id
      amount
      description
      debit
      credit
      category
      insertedAt
    }
  }
`;

export const GetTransactionAndMerchants = gql`
  query GetTransactionAndMerchants($transactionId: ID!) {
    transaction(id: $transactionId) {
      id
      amount
      credit
      debit
      category

      description
      merchant {
        id
        name
      }
      user {
        id
      }
    }

    merchants {
      id
      name
    }
  }
`;
