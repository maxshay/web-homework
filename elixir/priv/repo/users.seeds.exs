alias Homework.Repo
alias Homework.Users.User


Repo.insert! %User {
  dob: ~D[1971-06-28],
  first_name: "Elom",
  last_name: "Moosk"
}


Repo.insert! %User {
  dob: ~D[1968-03-21],
  first_name: "Rick",
  last_name: "Sanchez"
}


Repo.insert! %User {
  dob: ~D[1988-10-02],
  first_name: "Leeroy",
  last_name: "Jenkins"
}
