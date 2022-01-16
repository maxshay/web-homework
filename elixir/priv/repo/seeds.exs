# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Homework.Repo
alias Homework.Users.User
alias Homework.Merchants.Merchant
alias Homework.Transactions.Transaction


general = Repo.insert! %Merchant {
  name: "General Market",
  description: "a market for nearly everything",
}

amazon = Repo.insert! %Merchant {
  name: "Amazon",
  description: "the largest online ecommerce platform",
}

safeway = Repo.insert! %Merchant {
  name: "Safeway",
  description: "an american supermarket chain",
}


moosk = Repo.insert! %User {
  dob: ~D[1971-06-28],
  first_name: "Elom",
  last_name: "Moosk"
}


rick = Repo.insert! %User {
  dob: ~D[1968-03-21],
  first_name: "Rick",
  last_name: "Sanchez"
}


leeroy = Repo.insert! %User {
  dob: ~D[1988-10-02],
  first_name: "Leeroy",
  last_name: "Jenkins"
}


Repo.insert! %Transaction {
  amount: 1000000,
  credit: true,
  debit: false,
  description: "rocket ship",
  category: "transportation",
  merchant: amazon,
  user: moosk
}



Repo.insert! %Transaction {
  amount: 400000,
  credit: true,
  debit: false,
  description: "fuel for rocket ship",
  category: "transportation",
  merchant: amazon,
  user: moosk
}


Repo.insert! %Transaction {
  amount: 100000,
  credit: true,
  debit: false,
  description: "virtual real estate on mars as an nft",
  category: "other",
  merchant: general,
  user: moosk
}


Repo.insert! %Transaction {
  amount: 1500,
  credit: true,
  debit: false,
  description: "tesla keychain",
  category: "other",
  merchant: general,
  user: moosk
}


Repo.insert! %Transaction {
  amount: 6000,
  credit: true,
  debit: false,
  description: "game of thrones, complete series",
  category: "entertainment",
  merchant: general,
  user: moosk
}



Repo.insert! %Transaction {
  amount: 400,
  credit: true,
  debit: false,
  description: "vegan strawberry protein bars",
  category: "health and wellness",
  merchant: safeway,
  user: moosk
}


# leeroy jenkins
Repo.insert! %Transaction {
  amount: 50000,
  credit: true,
  debit: false,
  description: "pet turtle",
  category: "other",
  merchant: general,
  user: leeroy
}

Repo.insert! %Transaction {
  amount: 200000,
  credit: true,
  debit: false,
  description: "aquarium for pet turtle",
  category: "other",
  merchant: general,
  user: leeroy
}

Repo.insert! %Transaction {
  amount: 45000,
  credit: true,
  debit: false,
  description: "turtle friend for first turtle",
  category: "other",
  merchant: general,
  user: leeroy
}

Repo.insert! %Transaction {
  amount: 2900,
  credit: true,
  debit: false,
  description: "pull up bars",
  category: "health and wellness",
  merchant: amazon,
  user: leeroy
}

Repo.insert! %Transaction {
  amount: 9000,
  credit: false,
  debit: true,
  description: "chips",
  category: "food",
  merchant: safeway,
  user: leeroy
}

Repo.insert! %Transaction {
  amount: 4000,
  credit: false,
  debit: false,
  description: "scooter maintenence",
  category: "transportation",
  merchant: general,
  user: leeroy
}


# rick sanchez
Repo.insert! %Transaction {
  amount: 4000,
  credit: true,
  debit: false,
  description: "alcohol",
  category: "health and wellness",
  merchant: safeway,
  user: rick
}

Repo.insert! %Transaction {
  amount: 1200,
  credit: true,
  debit: false,
  description: "birthday present for morty",
  category: "other",
  merchant: amazon,
  user: rick
}

Repo.insert! %Transaction {
  amount: 60000,
  credit: true,
  debit: false,
  description: "quantum spaceship battery repair",
  category: "transportation",
  merchant: general,
  user: rick
}

Repo.insert! %Transaction {
  amount: 800,
  credit: true,
  debit: false,
  description: "netflix subscription",
  category: "entertainment",
  merchant: general,
  user: rick
}
