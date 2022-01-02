defmodule Homework.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Homework.Transactions.Transaction


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "users" do
    field(:dob, :date)
    field(:first_name, :string)
    field(:last_name, :string)
    has_many(:transactions, Transaction)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :dob])
    |> validate_required([:first_name, :last_name, :dob])
  end
end
