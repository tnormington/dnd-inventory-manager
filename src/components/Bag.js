import React from "react";

import CustomWeight from "./CustomWeight";

const Bag = ({
  bagContents,
  handleCustomWeight,
  removeItemFromBag,
  toggleEditCustomWeight,
  addToBag,
}) => {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #fff",
        marginBottom: "1rem",
      }}
    >
      {bagContents.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <b>Name</b>
          <b>Weight</b>
        </div>
      )}
      {bagContents.length === 0 && (
        <div style={{ textAlign: "center" }}>There is nothing here.</div>
      )}
      {bagContents.map((item) => (
        <div
          key={item.index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            padding: "8px 0",
            borderBottom: "1px solid #3c3c3c",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <button
              style={{
                marginRight: 10,
              }}
              className="icon-button icon-button--red"
              onClick={() => removeItemFromBag(item)}
            >
              &times;
            </button>
            <button
              style={{
                marginRight: 10,
              }}
              className="icon-button icon-button--blue"
              onClick={() => addToBag(item)}
            >
              &#43;
            </button>
            {item.name}
            {item.quantity > 1 && (
              <span style={{ marginLeft: 6 }}> &times; {item.quantity}</span>
            )}
          </span>
          {item.weight && <span>{item.weight}</span>}
          {(!item.weight || item.customWeight) && (
            <CustomWeight
              item={item}
              handleCustomWeight={handleCustomWeight}
              toggleEditCustomWeight={toggleEditCustomWeight}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Bag;
