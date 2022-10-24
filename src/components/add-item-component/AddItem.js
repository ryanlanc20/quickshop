import {useState} from "react";
import AddItemButton from "./components/AddItemButton.js";
import TextField from "./components/TextField.js";
import PriceSelector from "./components/PriceSelector.js";
import {useContext} from "react";
import { ShoppingListContext, CurrentListContext, QuickAddListContext} from "../../App.js";
import WholeNumberValidator from "../../validators/WholeNumberValidator.js";
import itemNameValidator from "../../validators/ItemNameValidator.js";
import fractionalValidator from "../../validators/FractionalValidator.js";

const AddItem = (props) => {
    
    // Status hook for displaying error messages
    const [status,setStatus] = useState(null);

    // State hook for item name
    const [itemName,setItemName] = useState("");

    // State hook for first currency unit
    const [firstUnitCurrency,setFirstCurrencyUnit] = useState("");

    // State hook for second currency unit
    const [secondUnitCurrency,setSecondCurrencyUnit] = useState("");

    // Context hook to add item to global storage.
    const [items,setItems] = useContext(ShoppingListContext);

    // Context hook to get current list index (need to make sure we update the selected shopping list)
    const [currentList,] = useContext(CurrentListContext);

    // Context hook to update quick add tags in global storage.
    const [quickAddItems,setQuickAddItems] = useContext(QuickAddListContext);

    const addQuickAddItem = (itemName,firstUnitCurrency,secondUnitCurrency) => {
        let items = {...quickAddItems};
        items[itemName] = {"firstCurrencyUnit":firstUnitCurrency,"secondCurrencyUnit":secondUnitCurrency};
        setQuickAddItems(items);
    };

    const createItem = () => {
        if (itemNameValidator(itemName))
        {
            setStatus({"msg":"Item name cannot be of length 0"})
            return;
        }
        if (!WholeNumberValidator(firstUnitCurrency))
        {
            setStatus({"msg": "First currency unit field must contain a whole number."})
            return;
        }
        if (!fractionalValidator(secondUnitCurrency))
        {
            setStatus({"msg": "Second currency unit field must contain a whole number."});
            return;
        }
        let numItems = Object.keys(items[currentList]["items"]).length;
        let newCollection = {...items};
        newCollection[currentList]["items"][numItems] = {id:numItems,itemName:itemName,"firstCurrencyUnit":parseInt(firstUnitCurrency),"secondCurrencyUnit":parseInt(secondUnitCurrency),qty:0};
        addQuickAddItem(itemName,parseInt(firstUnitCurrency),parseInt(secondUnitCurrency));
        setItems(newCollection);
        setStatus(null);
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    Add item
                </div>
                <div className="card-body">
                    <form>
                        {
                            status != null ? <div className="alert alert-danger">{status["msg"]}</div> : ""
                        }
                        <div className="row mt-2">
                            <div className="col-md">
                                Item name
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md">
                                <TextField
                                    itemNameChanger={setItemName}
                                    value={itemName}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md">
                                Item price
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md">
                                <PriceSelector
                                    changeFirstCurrencyUnit={setFirstCurrencyUnit}
                                    changeSecondCurrencyUnit={setSecondCurrencyUnit}
                                    firstCurrencyUnit={firstUnitCurrency}
                                    secondCurrencyUnit={secondUnitCurrency}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md">
                                <AddItemButton
                                    createItemCallback={createItem}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};

export default AddItem;