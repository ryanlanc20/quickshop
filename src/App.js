import logo from './logo.svg';
import './styling/App.css';
import "./styling/add-item-styles/TextField.css";
import "./styling/add-item-styles/AddItemButton.css";
import './styling/list-switcher-styles/list-switcher.css';
import "./styling/shopping-list/list-item.css";
import AddItem from "./components/add-item-component/AddItem.js";
import ShoppingList from "./components/shopping-list-component/ShoppingList.js";
import ListSwitcher from './components/list-switcher-component/ListSwitcher';
import QuickAdd from "./components/quick-add-component/QuickAdd.js";
import {useState,createContext,useEffect} from "react";

/*
   Global state variables
*/

// Contains all shopping lists
export const ShoppingListContext = createContext();

// Stores index of currently selected shopping list
export const CurrentListContext = createContext();

// Stores previously added items, along with their prices.
export const QuickAddListContext = createContext();


/*
    App component
*/
function App() {
  // Load shopping lists from local storage or create new
  const [listItems,setItems] = useState(JSON.parse(sessionStorage.getItem("data"))||{0:{"items":{},"date":""}});

  // Load quick add items
  const [quickAddItems,setQuickAddItems] = useState(JSON.parse(sessionStorage.getItem("quick_add")) || {})

  // Set default list index
  const [currentList,setList] = useState(0);

  // Update storage when list items are changed
  useEffect(() => {
      sessionStorage.setItem("data",JSON.stringify(listItems))
  },[listItems]);

  // Update quick add tags in local storage
  useEffect(() => {
      sessionStorage.setItem("quick_add",JSON.stringify(quickAddItems));
  },[quickAddItems]);
  
  return (
      <>
      <CurrentListContext.Provider value={[currentList,setList]}>
            <ShoppingListContext.Provider value={[listItems,setItems]}>
                <QuickAddListContext.Provider value={[quickAddItems,setQuickAddItems]}>
                    <ListSwitcher/>
                    <AddItem/>
                    <QuickAdd/>
                    <ShoppingList/>
                </QuickAddListContext.Provider>
            </ShoppingListContext.Provider>
      </CurrentListContext.Provider>
      </>
  );
}

export default App;
