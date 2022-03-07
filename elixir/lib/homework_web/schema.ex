defmodule HomeworkWeb.Schema do
  @moduledoc """
  Defines the graphql schema for this project.
  """
  use Absinthe.Schema

  alias HomeworkWeb.Resolvers.MerchantsResolver
  alias HomeworkWeb.Resolvers.TransactionsResolver
  alias HomeworkWeb.Resolvers.UsersResolver
  import_types(HomeworkWeb.Schemas.Types)

  query do
    @desc "Get a Transaction"
    field(:transaction, :transaction) do
      arg :id, :id
      resolve(&TransactionsResolver.transaction/3)
    end


    @desc "Get all Transactions"
    field(:transactions, list_of(:transaction)) do
      resolve(&TransactionsResolver.transactions/3)
    end

    @desc "Get all Users"
    field(:users, list_of(:user)) do
      resolve(&UsersResolver.users/3)
    end

    @desc "Get a User"
    field(:user, :user) do
      arg :id, :id
      resolve(&UsersResolver.user/3)
    end


    @desc "Search Merchants"
    field(:search_merchants, list_of(:merchant)) do
      arg :query, :string
      resolve(&MerchantsResolver.search_merchants/3)
    end

    @desc "Get a Merchant"
    field(:merchant, :merchant) do
      arg :id, :id
      resolve(&MerchantsResolver.merchant/3)
    end


    @desc "Get all Merchants"
    field(:merchants, list_of(:merchant)) do
      resolve(&MerchantsResolver.merchants/3)
    end
  end

  mutation do
    import_fields(:transaction_mutations)
    import_fields(:user_mutations)
    import_fields(:merchant_mutations)
  end
end
