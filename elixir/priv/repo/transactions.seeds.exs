alias Homework.Repo
alias Homework.Transactions.Transaction

# get users
moosk = Homework.Users.get_user!("1337bd41-58e7-4639-85fe-bf71c1e7315d")
leeroy = Homework.Users.get_user!("33dede3a-93f2-4324-b098-98602b875a63")
rick = Homework.Users.get_user!("e56e71a2-3881-482d-aff5-da50e8a55400")

# get merchants
general = Homework.Merchants.get_merchant!("d3e662ea-e117-4c5d-a6d5-9cd0c815893b")
amazon = Homework.Merchants.get_merchant!("a6273b10-3e2f-4284-8123-b9ba3d3df5ec")
safeway = Homework.Merchants.get_merchant!("d6f74820-fac5-48b5-a903-11729f487c83")


# moosk
Repo.insert! %Link {
  amount: 1,
  credit: true,
  debit: false,
  description: "",

}


# leeroy jenkins











# rick sanchez
