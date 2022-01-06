import React from "react";
import { useQuery } from "@apollo/client";
import { GetAllPeople } from "../gql";
import { Link } from "react-router-dom";

function Participants() {
  const { loading, error, data = {} } = useQuery(GetAllPeople);

  if (loading) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">Transactions</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">Transactions</h2>
        <p>Error ¯\_(ツ)_/¯</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-500 my-4">
        All Participients
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div className="col-span-1">
          <p className="font-bold">Vendors / Merchants</p>
          <hr className="my-2" />
          {data.merchants.map((m) => (
            <div key={m.id}>
              <Link to={`/merchant/${m.id}`}>
                <span className="underline">{m.name}</span>
              </Link>
              <br />
              {m.description}
              <hr className="my-2" />
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <p className="font-bold">Users / Customers</p>
          <hr className="my-2" />

          {data.users.map((u) => (
            <div key={u.id}>
              <Link to={`/user/${u.id}`}>
                <span className="underline">
                  {u.firstName} {u.lastName}
                </span>
              </Link>
              <br />
              birthday: {u.dob.split("T")[0]}
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Participants };
