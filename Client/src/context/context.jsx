// CheckedItemsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CheckedItemsContext = createContext();

export const useCheckedItems = () => useContext(CheckedItemsContext);

export const CheckedItemsProvider = ({ children }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('checkedItems')) || [];
    setCheckedItems(storedState);
  }, []);

  const updateCheckedItems = (id, isChecked) => {
    let updatedState;
    if (isChecked) {
      updatedState = [...checkedItems, id];
    } else {
      updatedState = checkedItems.filter((itemId) => itemId !== id);
    }
    localStorage.setItem('checkedItems', JSON.stringify(updatedState));
    setCheckedItems(updatedState);
  };

  return (
    <CheckedItemsContext.Provider value={{ checkedItems, updateCheckedItems }}>
      {children}
    </CheckedItemsContext.Provider>
  );
};
