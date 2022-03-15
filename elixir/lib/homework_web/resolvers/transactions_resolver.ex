defmodule HomeworkWeb.Resolvers.TransactionsResolver do
  import Ecto.Query
  alias Homework.Repo
  alias Absinthe.Relay
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Transactions.Transaction
  alias Homework.Users

  @doc """
  Get a list of transcations
  """
  def transactions(_root, args, _info) do
    {:ok, Transactions.list_transactions(args)}
  end


  @doc """
  Get a partial list of transcations
  with cursor, limit, amount contraints (min, max parameters)
  """

  def list_transactions(_, args, _resolution) do
    query = from t in Transaction
    {:ok, result} = Absinthe.Relay.Connection.from_query(query, &Repo.all/1, args)
    {:ok, Map.put(result, :count_query, query)}
  end


  def p_transactions(_root, args, _info) do
    min = Map.get(args, :min)
    max = Map.get(args, :max)

    case {min, max} do
      {nil, nil} ->
        {:ok, Transactions.list_partial_transactions(args)}
      {min, nil} ->
        {:ok, Transactions.list_transactions_min(args, min)}
      {nil, max} ->
        {:ok, Transactions.list_transactions_max(args, max)}
      {min, max} ->
        {:ok, Transactions.list_transactions_amount(args, min, max)}
    end
  end


  @doc """
  Get a transcation
  """
  def transaction(_root, %{id: id}, _info) do
    case Ecto.UUID.cast(id) do
      {:ok, id} ->
        {:ok, Transactions.get_transaction(id)}

      :error ->
        {:error, "invalid id"}
    end
  end

  @doc """
  Get the user associated with a transaction
  """
  def user(_root, _args, %{source: %{user_id: user_id}}) do
    {:ok, Users.get_user!(user_id)}
  end

  @doc """
  Get the merchant associated with a transaction
  """
  def merchant(_root, _args, %{source: %{merchant_id: merchant_id}}) do
    {:ok, Merchants.get_merchant!(merchant_id)}
  end

  @doc """
  Create a new transaction
  """
  def create_transaction(_root, args, _info) do
    IO.inspect(args)

    case Transactions.create_transaction(args) do

      {:ok, transaction} ->
        {:ok, transaction}

      error ->
        {:error, "could not create transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a transaction for an id with args specified.
  """
  def update_transaction(_root, %{id: id} = args, _info) do
    transaction = Transactions.get_transaction!(id)

    case Transactions.update_transaction(transaction, args) do
      {:ok, transaction} ->
        {:ok, transaction}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a transaction for an id
  """
  def delete_transaction(_root, %{id: id}, _info) do

    case Ecto.UUID.cast(id) do
      {:ok, id} ->
        transaction = Transactions.get_transaction!(id)
        case Transactions.delete_transaction(transaction) do
          {:ok, transaction} ->
            {:ok, transaction}

          error ->
            {:error, "could not delete transaction: #{inspect(error)}"}
        end

      :error ->
        {:error, "invalid id"}
    end

  end
end
