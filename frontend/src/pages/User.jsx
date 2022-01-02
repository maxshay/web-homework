import React from "react";
import { Outlet } from "react-router-dom";

function User() {
  return (
    <div>
      <h2 className="font-bold text-xl text-gray-400 mt-4">User Details</h2>
      <Outlet />
    </div>
  );
}

export { User };
