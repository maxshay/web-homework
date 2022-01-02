alias Homework.Repo
alias Homework.Transactions.Transaction

# Only categories

# Food
# Health and wellness
# Transportation
# Entertainment
# Other


# get users
moosk = Homework.Users.get_user!("1337bd41-58e7-4639-85fe-bf71c1e7315d")
leeroy = Homework.Users.get_user!("33dede3a-93f2-4324-b098-98602b875a63")
rick = Homework.Users.get_user!("e56e71a2-3881-482d-aff5-da50e8a55400")

# get merchants
general = Homework.Merchants.get_merchant!("d3e662ea-e117-4c5d-a6d5-9cd0c815893b")
amazon = Homework.Merchants.get_merchant!("a6273b10-3e2f-4284-8123-b9ba3d3df5ec")
safeway = Homework.Merchants.get_merchant!("d6f74820-fac5-48b5-a903-11729f487c83")


# moosk

# # done
# Repo.insert! %Transaction {
#   amount: 1,
#   credit: true,
#   debit: false,
#   description: "ice cream",
#   category: "Food",
#   merchant: safeway,
#   user: moosk
# }

Repo.insert! %Transaction {
  amount: 10000,
  credit: true,
  debit: false,
  description: "rocket ship",
  category: "transportation",
  merchant: amazon,
  user: moosk
}

:timer.sleep(2000)


Repo.insert! %Transaction {
  amount: 4000,
  credit: true,
  debit: false,
  description: "fuel for rocket ship",
  category: "transportation",
  merchant: amazon,
  user: moosk
}

:timer.sleep(2000)

Repo.insert! %Transaction {
  amount: 1000,
  credit: true,
  debit: false,
  description: "virtual real estate on mars as an nft",
  category: "other",
  merchant: general,
  user: moosk
}

:timer.sleep(2000)

Repo.insert! %Transaction {
  amount: 15,
  credit: true,
  debit: false,
  description: "tesla keychain",
  category: "other",
  merchant: general,
  user: moosk
}

:timer.sleep(2000)

Repo.insert! %Transaction {
  amount: 60,
  credit: true,
  debit: false,
  description: "game of thrones, complete series",
  category: "entertainment",
  merchant: general,
  user: moosk
}

:timer.sleep(2000)


Repo.insert! %Transaction {
  amount: 4,
  credit: true,
  debit: false,
  description: "vegan strawberry protein bars",
  category: "health and wellness",
  merchant: safeway,
  user: moosk
}


:timer.sleep(2000)

# leeroy jenkins
Repo.insert! %Transaction {
  amount: 500,
  credit: true,
  debit: false,
  description: "pet turtle",
  category: "other",
  merchant: general,
  user: leeroy
}
:timer.sleep(2000)

Repo.insert! %Transaction {
  amount: 2000,
  credit: true,
  debit: false,
  description: "aquarium for pet turtle",
  category: "other",
  merchant: general,
  user: leeroy
}

:timer.sleep(2000)
Repo.insert! %Transaction {
  amount: 450,
  credit: true,
  debit: false,
  description: "turtle friend for first turtle",
  category: "other",
  merchant: general,
  user: leeroy
}
:timer.sleep(2000)

Repo.insert! %Transaction {
  amount: 29,
  credit: true,
  debit: false,
  description: "pull up bars",
  category: "health and wellness",
  merchant: amazon,
  user: leeroy
}
:timer.sleep(2000)

Repo.insert! %Transaction {
  amount: 90,
  credit: false,
  debit: true,
  description: "chips",
  category: "food",
  merchant: safeway,
  user: leeroy
}
:timer.sleep(2000)

Repo.insert! %Transaction {
  amount: 40,
  credit: false,
  debit: false,
  description: "scooter maintenence",
  category: "transportation",
  merchant: general,
  user: leeroy
}

:timer.sleep(2000)

# rick sanchez
Repo.insert! %Transaction {
  amount: 40,
  credit: true,
  debit: false,
  description: "alcohol",
  category: "health and wellness",
  merchant: safeway,
  user: rick
}

:timer.sleep(2000)
Repo.insert! %Transaction {
  amount: 12,
  credit: true,
  debit: false,
  description: "birthday present for morty",
  category: "other",
  merchant: amazon,
  user: rick
}

:timer.sleep(2000)
Repo.insert! %Transaction {
  amount: 600,
  credit: true,
  debit: false,
  description: "quantum spaceship battery repair",
  category: "transportation",
  merchant: general,
  user: rick
}

:timer.sleep(2000)
Repo.insert! %Transaction {
  amount: 8,
  credit: true,
  debit: false,
  description: "netflix subscription",
  category: "entertainment",
  merchant: general,
  user: rick
}
