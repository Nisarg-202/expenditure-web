import React from 'react';

function ItemDetails({item, onEditChange}) {
  return (
    <div
      className="d-flex justify-content-between"
      id="data"
      onClick={function () {
        onEditChange(item);
      }}
    >
      <h5>{item.description}</h5>
      <p>{item.price}</p>
    </div>
  );
}

export default ItemDetails;
