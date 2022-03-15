alias Homework.Users.User
alias Homework.Merchants.Merchant
alias Homework.Transactions.Transaction

# get some users
total_user_count = 10

%{body: body} = HTTPoison.get!("https://randomuser.me/api?results=#{total_user_count}")
%{"results" => results}  = Jason.decode!(body)

persons_created = Enum.reduce(results, [], fn person, persons_created ->
  %{"name" => %{"first" => first, "last" => last}, "dob" => %{"date" => date}} = person
  date_split = String.split(date, "T") |> Enum.at(0)

  {:ok, dob} = Date.from_iso8601(date_split)
  user = User.changeset(%User{}, %{first_name: first, last_name: last, dob: dob})
  user_inserted = Homework.Repo.insert!(user)
  [user_inserted | persons_created]

end)


# create merchants
merchants_created = "./stores_data.csv"
  |> Path.expand(__DIR__)
  |> File.stream!
  |> CSV.Decoding.Decoder.decode(headers: true)
  |> Enum.reduce([], fn merchant, merchants_created ->
    {:ok, %{"store_description" => desc, "store_labels" => label_string, "store_title" => title}} = merchant
    labels = label_string
      |> String.replace("'", "\"")
      |> Jason.decode()
      |> elem(1)

    merchant = Merchant.changeset(%Merchant{}, %{name: title, description: desc, tags: labels})
    merchant_inserted = Homework.Repo.insert!(merchant)
    [merchant_inserted | merchants_created]
  end)

# create transactions
"./expense_report.csv"
|> Path.expand(__DIR__)
|> File.stream!
|> CSV.Decoding.Decoder.decode(headers: true)
|> Enum.each(fn
  {:ok, %{"Category" => category, "Note" => notes, "Amount" => amount}} ->
    u = Enum.random(persons_created)
    m = Enum.random(merchants_created)
    t = Transaction.changeset(%Transaction{}, %{user_id: u.id, merchant_id: m.id, amount: amount, credit: true, debit: false, description: notes, category: category})
    Homework.Repo.insert!(t)
  {:ok, something_else} -> IO.inspect(something_else)
  {_, _} -> IO.inspect("bad")
end)
