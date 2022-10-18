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

export const ShoppingListContext = createContext();
export const CurrentListContext = createContext();
export const QuickAddListContext = createContext();

function App() {
  // Default Item 0:{id: 0, itemName:"Bread",pounds:1,pennies:10,qty:1}
  const [listItems,setItems] = useState(JSON.parse(sessionStorage.getItem("data"))||{0:{"items":{},"date":""}});
  const [quickAddItems,setQuickAddItems] = useState(JSON.parse(sessionStorage.getItem("quick_add")) || {})
  const [currentList,setList] = useState(0);


  useEffect(() => {
      sessionStorage.setItem("data",JSON.stringify(listItems))
  },[listItems]);

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
