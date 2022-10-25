import { ShoppingListContext, CurrentListContext, QuickAddListContext} from "../../App.js";
import {useContext} from "react";


const QuickAdd = () => {

    // Reference to shopping lists
    const [items,setItems] = useContext(ShoppingListContext);

    // Reference to current list index
    const [currentList,] = useContext(CurrentListContext);

    // Reference to quick add items
    const [quickAddItems,setQuickAddItems] = useContext(QuickAddListContext);

    const createItem = (itemName,firstCurrencyUnit,secondCurrencyUnit) => {
        // Get list count
        let numItems = Object.keys(items[currentList]["items"]).length;

        // Copy list items (to force state update)
        let newCollection = {...items};

        // Add 'quick add' item
        newCollection[currentList]["items"][numItems] = {id:numItems,itemName:itemName,firstCurrencyUnit:firstCurrencyUnit,secondCurrencyUnit:secondCurrencyUnit,qty:0};
        
        // Return collection to global storage
        setItems(newCollection);
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    Quick add
                </div>
                <div className="card-body">
                    {
                        Object.keys(quickAddItems).map((key) => {
                            return (
                                <button className="btn btn-secondary ml-2" onClick={() => {createItem(key,quickAddItems[key]["firstCurrencyUnit"],quickAddItems[key]["secondCurrencyUnit"])}}>
                                    {key}
                                    <div className="badge badge-light ml-2">
                                        £{(quickAddItems[key]["firstCurrencyUnit"] + (quickAddItems[key]["secondCurrencyUnit"]/100)).toFixed(2)}
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default QuickAdd;