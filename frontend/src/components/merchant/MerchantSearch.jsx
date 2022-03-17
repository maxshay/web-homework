import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { SearchMerchants } from "../../gql/merchant";

const MerchantSearch = () => {
  const [suggestions, setSuggestions] = useState();
  const [loading, setLoading] = useState(false);
  const [getMerchantsSearch] = useLazyQuery(SearchMerchants);

  const search = async (e) => {
    const query = e.target.value;
    if (query === "") {
      setLoading(false);
      setSuggestions();
    } else {
      try {
        const res = await getMerchantsSearch({
          variables: { query },
        });
        setSuggestions(res.data.searchMerchants);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
  };

  const dbounce = debounce(search, 500, {
    maxWait: 1500,
  });

  return (
    <>
      <hr className="my-4" />
      <div className="relative">
        <input
          type="text"
          placeholder="Search for merchant"
          className={`w-full p-2 outline-none border-gray-300${
            suggestions || loading
              ? " border-t border-l border-r rounded-t-md"
              : " border rounded-md"
          }`}
          onChange={(e) => {
            setSuggestions();
            setLoading(true);
            dbounce(e);
          }}
        />
        <div
          className="absolute w-full bg-white border-l border-r border-b border-gray-300 shadow"
          style={
            !suggestions && !loading ? { display: "none" } : { top: "100%" }
          }
        >
          {loading && (
            <div className="text-center p-2 border-t border-gray-300">
              Loading
            </div>
          )}
          {suggestions &&
            suggestions.map((s) => (
              <Link to={`/merchant/${s.id}`} key={s.id}>
                <div className="p-2 border-t border-gray-300 hover:bg-gray-50 transition-colors">
                  {s.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default MerchantSearch;
