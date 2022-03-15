defmodule HomeworkWeb.Schemas.TransactionsSchema do
  @moduledoc """
  Defines the graphql schema for transactions.
  """
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias Homework.Repo
  alias HomeworkWeb.Resolvers.TransactionsResolver


  # connection(node_type: :transaction)
  connection node_type: :transaction_type do
    field :total_count, :integer do
      resolve fn parent, _, _ ->
        count = Repo.aggregate(parent.count_query, :count, :id)
        {:ok, count}
      end
    end

    edge do
    end
  end

  object :transaction do
    field(:id, non_null(:id))
    field(:user_id, :id)
    field(:amount, :integer)
    field(:credit, :boolean)
    field(:debit, :boolean)
    field(:description, :string)
    field(:category, :string)
    field(:merchant_id, :id)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)

    field(:user, :user) do
      resolve(&TransactionsResolver.user/3)
    end

    field(:merchant, :merchant) do
      resolve(&TransactionsResolver.merchant/3)
    end

  end

  node object :transaction_type do
    field(:id, non_null(:id))
    field(:user_id, :id)
    field(:amount, :integer)
    field(:credit, :boolean)
    field(:debit, :boolean)
    field(:description, :string)
    field(:category, :string)
    field(:merchant_id, :id)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)

    field(:user, :user) do
      resolve(&TransactionsResolver.user/3)
    end

    field(:merchant, :merchant) do
      resolve(&TransactionsResolver.merchant/3)
    end

  end



  object :transaction_queries do
    connection field :list_transactions, node_type: :transaction_type do
      resolve(&TransactionsResolver.list_transactions/3)
    end
  end




  object :transaction_mutations do
    @desc "Create a new transaction"
    field :create_transaction, :transaction do
      arg(:user_id, non_null(:id))
      arg(:merchant_id, non_null(:id))
      @desc "⬆ amount is in cents"
      arg(:amount, non_null(:integer))
      arg(:credit, non_null(:boolean))
      arg(:debit, non_null(:boolean))
      arg(:description, non_null(:string))
      arg(:category, non_null(:string))

      resolve(&TransactionsResolver.create_transaction/3)
    end

    @desc "Update a new transaction"
    field :update_transaction, :transaction do
      arg(:id, non_null(:id))
      arg(:user_id, non_null(:id))
      arg(:merchant_id, non_null(:id))
      @desc "⬆ amount is in cents"
      arg(:amount, non_null(:integer))
      arg(:credit, non_null(:boolean))
      arg(:debit, non_null(:boolean))
      arg(:description, non_null(:string))
      arg(:category, non_null(:string))

      resolve(&TransactionsResolver.update_transaction/3)
    end

    @desc "delete an existing transaction"
    field :delete_transaction, :transaction do
      arg(:id, non_null(:id))

      resolve(&TransactionsResolver.delete_transaction/3)
    end
  end
end
