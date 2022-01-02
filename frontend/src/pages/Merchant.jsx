import React from "react";
import { Outlet } from "react-router-dom";

function Merchant() {
  return (
    <div>
      <h2 className="font-bold text-xl">Merchant.jsx</h2>
      <Outlet />
    </div>
  );
}

export { Merchant };
