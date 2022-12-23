import React from "react";

const CustomWeight = ({ handleCustomWeight, item, toggleEditCustomWeight }) => {
  const QuickWeightButton = ({ add = true, amount }) => {
    return (
      <button
        style={{
          margin: "0 2px",
          fontSize: "10px",
          padding: 4,
        }}
        className="icon-button"
        onClick={() => {
          const w = item.customWeight ? item.customWeight : 0;
          const newW = add ? w + amount : w - amount;
          handleCustomWeight(item, newW);
        }}
      >
        {add ? "+" : "-"}
        {amount}
      </button>
    );
  };

  return (
    <div>
      {item.editingWeight && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <QuickWeightButton add={false} amount={1} />
          <QuickWeightButton add={false} amount={5} />
          <QuickWeightButton add={false} amount={10} />
          <input
            type="number"
            style={{ width: "50px", textAlign: "center" }}
            placeholder="Custom"
            value={item.customWeight ? item.customWeight : 0}
            onChange={(e) => handleCustomWeight(item, e.target.value)}
          />
          <QuickWeightButton amount={1} />
          <QuickWeightButton amount={5} />
          <QuickWeightButton amount={10} />
          <button
            className="icon-button"
            style={{
              color: "#ababff",
              borderColor: "#ababff",
            }}
            onClick={() => toggleEditCustomWeight(item)}
          >
            &#10003;
          </button>
        </div>
      )}
      {!item.editingWeight && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="icon-button"
            style={{ marginRight: 8 }}
            onClick={() => toggleEditCustomWeight(item)}
          >
            &#8285;
          </button>
          {item.customWeight}
        </div>
      )}
    </div>
  );
};
export default CustomWeight;
