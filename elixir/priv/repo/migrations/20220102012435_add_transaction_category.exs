defmodule Homework.Repo.Migrations.AddTransactionCategory do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add :category, :string
    end
  end
end
