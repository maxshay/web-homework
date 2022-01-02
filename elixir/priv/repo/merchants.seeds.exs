alias Homework.Repo
alias Homework.Merchants.Merchant




Repo.insert! %Merchant {
  name: "General Market",
  description: "a market for nearly everything",
}

Repo.insert! %Merchant {
  name: "Amazon",
  description: "the largest online ecommerce platform",
}

Repo.insert! %Merchant {
  name: "Safeway",
  description: "an american supermarket chain",
}
