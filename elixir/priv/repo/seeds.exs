alias Homework.Users.User
# alias Homework.Merchants.Merchant
# alias Homework.Transactions.Transaction

# get some users

# IO.puts("#{first} - #{last}, date: #{date_split}")
"""
%{body: body} = HTTPoison.get!("https://randomuser.me/api?results=1")
%{"results" => results}  = Jason.decode!(body)
persons_created = []

Enum.each results, fn person ->
  %{"name" => %{"first" => first, "last" => last}, "dob" => %{"date" => date}} = person

  date_split = String.split(date, "T") |> Enum.at(0)



  # case MyRepo.insert %Post{title: "Ecto is great"} do
  #   {:ok, struct}       -> # Inserted with success
  #   {:error, changeset} -> # Something went wrong
  # end

  {:ok, dob} = Date.from_iso8601(date_split)
  user = User.changeset(%User{}, %{first_name: first, last_name: last, dob: dob})
  user_inserted = Homework.Repo.insert!(user)
  persons_created = [user_inserted | persons_created]

end
"""


# create merchants
"./stores_data.csv"
|> Path.expand(__DIR__)
|> File.stream!
|> CSV.decode
|> Enum.take(2)
|> IO.inspect()


# create transactions
