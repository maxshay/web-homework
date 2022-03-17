import React from "react";
import { useQuery } from "@apollo/client";
import { GetAllPeople } from "../gql";
import { Link } from "react-router-dom";
import MerchantSearch from "../components/merchant/MerchantSearch";

function Participants() {
  const { loading, error, data = {} } = useQuery(GetAllPeople);

  if (loading) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">Participants</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">Participants</h2>
        <p>Error ¯\_(ツ)_/¯</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-500 my-4">
        All Participients
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4 mt-4">
        <div className="col-span-1">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
            <p className="font-bold">Vendors / Merchants</p>
            <MerchantSearch />
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
        </div>
        <div className="col-span-1">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
            <p className="font-bold mt-4 xl:mt-0">Users / Customers</p>
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
      <div className="pt-10"></div>
    </div>
  );
}

export { Participants };
