import React from "react";
import { Outlet } from "react-router-dom";

function User() {
  return (
    <div>
      <h2 className="font-bold text-xl">User.jsx</h2>
      <Outlet />
    </div>
  );
}

export { User };
