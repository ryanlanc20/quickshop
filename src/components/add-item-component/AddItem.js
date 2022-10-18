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
    
    const [status,setStatus] = useState(null);

    // State hook for item name
    const [itemName,setItemName] = useState("");

    // State hook for GBP
    const [itemPricePounds,setPounds] = useState("");

    // State hoot for pennies
    const [itemPricePennies,setPennies] = useState("");

    // Callback to create item (called by add button)
    const [items,setItems] = useContext(ShoppingListContext);

    const [currentList,] = useContext(CurrentListContext);

    const [quickAddItems,setQuickAddItems] = useContext(QuickAddListContext);

    const addQuickAddItem = (itemName,itemPricePounds,itemPricePence) => {
        let items = {...quickAddItems};
        items[itemName] = {"pounds":itemPricePounds,"pence":itemPricePence};
        setQuickAddItems(items);
    };

    const createItem = () => {
        if (itemNameValidator(itemName))
        {
            setStatus({"msg":"Item name cannot be of length 0"})
            return;
        }
        if (!WholeNumberValidator(itemPricePounds))
        {
            setStatus({"msg": "Pounds field must contain digits 0-9"})
            return;
        }
        if (!fractionalValidator(itemPricePennies))
        {
            setStatus({"msg": "Pence field must contain two digits between 0-9"});
            return;
        }
        let numItems = Object.keys(items[currentList]["items"]).length;
        let newCollection = {...items};
        newCollection[currentList]["items"][numItems] = {id:numItems,itemName:itemName,pounds:parseInt(itemPricePounds),pennies:parseInt(itemPricePennies),qty:0};
        addQuickAddItem(itemName,parseInt(itemPricePounds),parseInt(itemPricePennies));
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
                                <TextField itemNameChanger={setItemName} value={itemName}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md">
                                Item price
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md">
                                <PriceSelector changePounds={setPounds} changePennies={setPennies} pounds={itemPricePounds} pennies={itemPricePennies}/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md">
                                <AddItemButton createItemCallback={createItem}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};

export default AddItem;