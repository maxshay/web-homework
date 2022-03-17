defmodule Homework.Transactions do
  @moduledoc """
  The Transactions context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Transactions.Transaction

  @doc """
  Returns the list of transactions.
  """
  def list_transactions(_args) do
    Repo.all(Transaction)
  end

  @doc """
  Gets a single transaction.
  Raises `Ecto.NoResultsError` if the Transaction does not exist.
  """
  def get_transaction!(id), do: Repo.get!(Transaction, id)
  def get_transaction(id), do: Repo.get(Transaction, id)

  @doc """
  Creates a transaction.
  """
  def create_transaction(attrs \\ %{}) do
    %Transaction{}
    |> Transaction.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a transaction.
  """
  def update_transaction(%Transaction{} = transaction, attrs) do
    transaction
    |> Transaction.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a transaction.
  """
  def delete_transaction(%Transaction{} = transaction) do
    Repo.delete(transaction)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking transaction changes.
  """
  def change_transaction(%Transaction{} = transaction, attrs \\ %{}) do
    Transaction.changeset(transaction, attrs)
  end
end
