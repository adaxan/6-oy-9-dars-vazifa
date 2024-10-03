import React from "react";

function Card(props) {
  const { name, price, description, id } = props.product;
  const {del} = props;
  return (
    <div className="w-1/4 mx-auto">
      <div className=" p-5 rounded-lg bg-gray-900 text-center">
        <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
        <h3 className="text-lg text-gray-600 mb-4">${price}</h3>
        <p className="text-sm text-white">{description}</p>
        <button onClick={() => {del(id)}} className="btn btn-secondary mt-5">Delete</button>
      </div>
    </div>
  );
}

export default Card;
