import React, { useState, useEffect } from "react";

import "./style.css";
import BagOfHolding from "./components/BagOfHolding";
import Result from "./components/Result";

const DOMAIN = "https://www.dnd5eapi.co";
const API_ROOT = DOMAIN + "/api/";

function App() {
  const [bagContents, setBagContents] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [results, setResults] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentWeightPercent, setCurrentWeightPercent] = useState(0);
  const [equipmentList, setEquipmentList] = useState(false);
  const [magicItemList, setMagicItemList] = useState(false);

  const fetchLists = async () => {
    let response = await fetch(API_ROOT + "equipment");
    if (response.status === 200) {
      const equipment = await response.json();
      setEquipmentList(equipment.results);
    }

    response = await fetch(API_ROOT + "magic-items");
    if (response.status === 200) {
      const magicItems = await response.json();
      setMagicItemList(magicItems.results);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    const calculateCurrentWeight = () => {
      if (bagContents.length === 0) {
        return 0;
      } else {
        return bagContents.reduce((accumulator, current) => {
          const { weight, customWeight } = current;
          const w = weight ? weight : customWeight;
          if (w) {
            return accumulator + w * current.quantity;
          } else {
            return accumulator;
          }
        }, 0);
      }
    };

    const w = calculateCurrentWeight();

    setCurrentWeight(w);
    setCurrentWeightPercent(w / 5);
  }, [bagContents]);

  useEffect(() => {
    const searchLists = () => {
      const keyword = currentItem.toLowerCase();
      let result = equipmentList.filter((item) => {
        return item.name.toLowerCase().includes(keyword);
      });
      result = [
        ...result,
        ...magicItemList.filter((item) =>
          item.name.toLowerCase().includes(keyword)
        ),
      ];
      setResults(result);
    };

    if (currentItem) {
      searchLists();
    } else {
      setResults([]);
    }
  }, [currentItem]);

  const addToBag = async (item) => {
    if (bagContents.find((_item) => _item.index === item.index) !== undefined) {
      setBagContents(
        bagContents.map((_item) => {
          if (_item.index === item.index) _item.quantity++;

          return _item;
        })
      );

      return;
    }
    let itemData;
    if (item.customItem) {
      itemData = {
        ...item,
        customWeight: 0,
        editingWeight: false,
        index: item.name,
      };
    } else {
      itemData = await getItemData(item);
      if (!itemData.weight) {
        itemData.editingWeight = false;
        itemData.customWeight = 0;
      }
    }

    itemData.quantity = 1;

    setBagContents([...bagContents, itemData]);
  };

  const removeItemFromBag = (item) => {
    if (item.quantity > 1) {
      setBagContents(
        bagContents.map((_item) => {
          if (_item.index === item.index) _item.quantity--;
          return _item;
        })
      );
    } else {
      setBagContents(bagContents.filter((i) => i.index !== item.index));
    }
  };

  const getItemData = async (item) => {
    const response = await fetch(DOMAIN + item.url);
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      // API connection error
    }
  };

  const handleInputChange = (e) => {
    setCurrentItem(e.target.value);
  };

  const handleCustomWeight = (item, weight) => {
    setBagContents(
      bagContents.map((i) => {
        if (i === item) {
          return { ...item, customWeight: Number(weight < 0 ? 0 : weight) };
        } else {
          return i;
        }
      })
    );
  };

  const toggleEditCustomWeight = (item) => {
    setBagContents(
      bagContents.map((i) => {
        if (i === item) {
          return { ...item, editingWeight: !item.editingWeight };
        } else {
          return i;
        }
      })
    );
  };

  const getWeightBarColor = () => {
    const c = 255 - (255 / 100) * currentWeightPercent;
    return `rgb(255, ${c}, ${c})`;
  };

  return (
    <div className="app">
      <div className="container">
        <div className="left-content">
          <h1>Item Directory</h1>
          <form
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div style={{ flex: "1 0 auto", position: "relative" }}>
              <input
                value={currentItem}
                onChange={handleInputChange}
                placeholder="Begin typing to search for an item from the SRD, or create a custom item"
                style={{ width: "100%" }}
                type="text"
              />
              {currentItem && (
                <button
                  className="icon-button icon-button--red"
                  style={{
                    position: "absolute",
                    right: 6,
                    top: 6,
                    width: 22,
                    height: 22,
                  }}
                  onClick={() => setCurrentItem("")}
                >
                  &times;
                </button>
              )}
            </div>
          </form>
          {results !== null &&
            results.map((item) => (
              <Result
                key={item.index}
                item={item}
                bagContents={bagContents}
                removeItemFromBag={removeItemFromBag}
                addToBag={addToBag}
              />
            ))}
          {currentItem && (
            <div className="result">
              <div className="result__left">
                <h3 className="title">{currentItem}</h3>
                <h5 className="sub-title">Custom</h5>
              </div>
              <div className="result__right">
                <button
                  onClick={() =>
                    addToBag({
                      name: currentItem,
                      customItem: true,
                    })
                  }
                >
                  Add To Bag
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="right-content">
          <BagOfHolding
            bagContents={bagContents}
            currentWeight={currentWeight}
            currentWeightPercent={currentWeightPercent}
            weightBarColor={getWeightBarColor()}
            handleCustomWeight={handleCustomWeight}
            removeItemFromBag={removeItemFromBag}
            toggleEditCustomWeight={toggleEditCustomWeight}
            addToBag={addToBag}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
