import { ShoppingListContext, CurrentListContext, QuickAddListContext} from "../../App.js";
import {useContext} from "react";
import * as uuid from "uuid";

const QuickAdd = () => {

    // Reference to shopping lists
    const [items,setItems] = useContext(ShoppingListContext);

    // Reference to current list index
    const [currentList,] = useContext(CurrentListContext);

    // Reference to quick add items
    const [quickAddItems,] = useContext(QuickAddListContext);

    const createItem = (itemName,firstCurrencyUnit,secondCurrencyUnit) => {

        // Copy list items (to force state update)
        let newCollection = {...items};

        // Get UUID for new list item
        let itemId = uuid.v4();

        // Add 'quick add' item
        newCollection[currentList]["items"][itemId] = {id:itemId,itemName:itemName,firstCurrencyUnit:firstCurrencyUnit,secondCurrencyUnit:secondCurrencyUnit,qty:0};
        
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