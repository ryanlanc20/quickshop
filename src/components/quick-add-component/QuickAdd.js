import { ShoppingListContext, CurrentListContext, QuickAddListContext} from "../../App.js";
import {useContext} from "react";


const QuickAdd = () => {

    const [items,setItems] = useContext(ShoppingListContext);
    const [currentList,] = useContext(CurrentListContext);
    const [quickAddItems,setQuickAddItems] = useContext(QuickAddListContext);

    const createItem = (itemName,itemPricePounds,itemPricePennies) => {
        let numItems = Object.keys(items[currentList]["items"]).length;
        let newCollection = {...items};
        newCollection[currentList]["items"][numItems] = {id:numItems,itemName:itemName,firstCurrencyUnit:itemPricePounds,secondCurrencyUnit:itemPricePennies,qty:0};
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