import React, { useState } from "react";
import Bag from "./Bag";
const WEIGHT_LIMIT = 500;

const BagOfHolding = ({
  bagContents,
  currentWeight,
  currentWeightPercent,
  weightBarColor,
  handleCustomWeight,
  removeItemFromBag,
  toggleEditCustomWeight,
  addToBag,
}) => {
  const [showBag, setShowBag] = useState(true);
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Bag of Holding</h3>
      {showBag && (
        <Bag
          bagContents={bagContents}
          handleCustomWeight={handleCustomWeight}
          removeItemFromBag={removeItemFromBag}
          toggleEditCustomWeight={toggleEditCustomWeight}
          addToBag={addToBag}
        />
      )}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="weight-bar">
          <label>
            {currentWeight} / {WEIGHT_LIMIT} weight ({currentWeightPercent}%)
          </label>
          <div
            className={`weight-bar__inner ${
              currentWeight > WEIGHT_LIMIT ? "shake" : ""
            }`}
            style={{
              width: `${
                currentWeightPercent > 100 ? 100 : currentWeightPercent
              }%`,
              backgroundColor: weightBarColor,
            }}
          />
        </div>
        {bagContents.length} item{bagContents.length === 1 ? "" : "s"} in bag
        {bagContents.length > 0 && (
          <button
            onClick={() => setShowBag(!showBag)}
            style={{ marginLeft: 10 }}
          >
            {showBag ? "Hide" : "Show"} Contents
          </button>
        )}
      </div>
    </div>
  );
};

export default BagOfHolding;
