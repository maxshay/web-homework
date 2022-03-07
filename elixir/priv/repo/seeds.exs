# alias Homework.Users.User
# alias Homework.Merchants.Merchant
# alias Homework.Transactions.Transaction

# get some users
%{body: body} = HTTPoison.get!("https://randomuser.me/api?results=1")
%{"results" => results}  = Jason.decode!(body)
persons_added = %{}
Enum.each results, fn person ->
  %{"name" => %{"first" => first, "last" => last}, "dob" => %{"date" => date}} = person

  date = String.split(date, "T") |> Enum.at(0)
  IO.puts("#{first} - #{last}, date: #{date}")
end

# create merchants


# create transactions
