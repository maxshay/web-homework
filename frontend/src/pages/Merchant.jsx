import React from "react";
import { Outlet } from "react-router-dom";

function Merchant() {
  return (
    <div>
      <h2 className="font-bold text-xl text-gray-500 my-4">Merchant Details</h2>
      <Outlet />
    </div>
  );
}

export { Merchant };
