import React from "react";
import PDP from "../pages/PDP";

const PdpId = (props) => {
  const { loading, error, data, params } = props;
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>An error occured</h1>;
  }
  if (data) {
    const product = data.categories[0].products.filter(
      (product) => product.id === params.id
    );
    return <PDP product={product[0]} />;
  }
};

export default PdpId;
