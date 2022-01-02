import React from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  const { userId } = useParams();
  return <p>UserDeatails.jsx for user: {userId}</p>;
}

export { UserDetails };
