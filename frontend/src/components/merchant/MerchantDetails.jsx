import React from "react";
import { useParams } from "react-router-dom";

function MerchantDetails() {
  const { merchantId } = useParams();

  // TODO: get merchant info with graphql

  return <p>MerchantDetails.jsx for merchant: {merchantId}</p>;
}

export { MerchantDetails };
