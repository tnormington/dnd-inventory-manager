import React from "react";

const Result = ({ item, bagContents, removeItemFromBag, addToBag }) => (
  <div className="result" key={item.index}>
    <div className="result__left">
      <h3 className="title">{item.name}</h3>
    </div>
    <div className="result__right">
      {bagContents.find((i) => i.name === item.name) && (
        <>
          <span>
            {bagContents.find((i) => i.name === item.name).quantity} in Bag
          </span>
          <button
            className="outline-button outline-button--red"
            style={{
              marginLeft: 8,
            }}
            onClick={() => removeItemFromBag(item)}
          >
            Remove
          </button>
        </>
      )}
      <button style={{ marginLeft: 8 }} onClick={() => addToBag(item)}>
        Add 1 To Bag
      </button>
    </div>
  </div>
);

export default Result;
