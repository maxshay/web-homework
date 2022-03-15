defmodule Homework.Merchants.Merchant do
  use Ecto.Schema
  import Ecto.Changeset
  alias Homework.Transactions.Transaction

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "merchants" do
    field(:description, :string)
    field(:name, :string)
    field(:tags, {:array, :string})
    has_many(:transactions, Transaction)

    timestamps()
  end

  @doc false
  def changeset(merchant, attrs) do
    merchant
    |> cast(attrs, [:name, :description, :tags])
    |> validate_required([:name, :description, :tags])
  end
end
