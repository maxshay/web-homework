defmodule Homework.Repo.Migrations.AddMerchantTags do
  use Ecto.Migration

  def change do
    alter table(:merchants) do
      add :tags, {:array, :string}
    end

  end
end
