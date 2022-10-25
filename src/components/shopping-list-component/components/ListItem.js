import PriceSelector from "../../add-item-component/components/PriceSelector.js";
import QuantityEditor from "./QuantityEditor.js";
import { ShoppingListContext, CurrentListContext } from "../../../App.js";
import EditableTextField  from "./EditableTextField.js";
import {useContext,useState} from "react";
import WholeNumberValidator from "../../../validators/WholeNumberValidator.js";
import fractionalValidator from "../../../validators/FractionalValidator.js";
import itemNameValidator from "../../../validators/ItemNameValidator.js";
import DeleteButton from "./DeleteButton.js";

const ListItem = (props) => {

    // Reference to shopping lists
    const [items,setItems] = useContext(ShoppingListContext);

    // Reference to current shopping list index
    const [currentList,] = useContext(CurrentListContext);

    // State hook to manage error messages
    const [status,setStatus] = useState(null);

    const updateFirstCurrencyUnit = (firstCurrencyUnit) => {

        // Validate input
        if(!WholeNumberValidator(firstCurrencyUnit))
        {
            setStatus({"type":"wholenumfail"});
            return;
        }

        // Take copy of collection (to force state update)
        let collection = {...items};

        // Update value
        collection[currentList]["items"][props.id]["firstCurrencyUnit"] = parseInt(firstCurrencyUnit);

        // Return collection to global storage
        setItems(collection);

        // Action was successful, so make sure no error message is displayed
        setStatus(null);
    };

    const updateSecondCurrencyUnit = (secondCurrencyUnit) => {

        // Validate input
        if(!fractionalValidator(secondCurrencyUnit))
        {
            setStatus({"type":"fractnumfail"});
            return;
        }

        // Take copy of collection to force update
        let collection = {...items};

        // Update value
        collection[currentList]["items"][props.id]["secondCurrencyUnit"] = parseInt(secondCurrencyUnit);

        // Return collection to global storage
        setItems(collection);

        // Action was successful, so make sure no error message is displayed.
        setStatus(null);
    };

    const updateQty = (qty) => {
        
        // Take copy of items collection (to force state update)
        let collection = {...items};

        // Update value
        collection[currentList]["items"][props.id]["qty"] = parseInt(qty);

        // Return collection to global storage
        setItems(collection);
    };

    const updateName = (name) => {

        // Validate input
        if(itemNameValidator(name))
        {
            setStatus({"type":"itemnamefail"});
        }

        // Take copy of items collection (to force state update)
        let collection = {...items};

        // Update value
        collection[currentList]["items"][props.id]["itemName"] = name;

        // Return collection to global storage
        setItems(collection);

        // Action was successful, so make sure no error message is displayed
        setStatus(null);
    }

    const deleteItem = () => {

        // Take copy of collection (to force state update)
        let collection = {...items};

        // Delete specified list item
        delete collection[currentList]["items"][props.id];

        // Return collection to global storage
        setItems(collection);
    }

    return(
        <tr className={status ? "alert-danger" : ""}>
            <td>
                <EditableTextField
                    text={props.itemName}
                    id={props.id}
                    updateCallback={updateName}
                />
            </td>
            <td>
                <PriceSelector
                    firstCurrencyUnit={props.firstCurrencyUnit}
                    secondCurrencyUnit={props.secondCurrencyUnit}
                    changeFirstCurrencyUnit={updateFirstCurrencyUnit}
                    changeSecondCurrencyUnit={updateSecondCurrencyUnit}
                />
            </td>
            <td>
                <QuantityEditor
                    qty={props.qty}
                    updateCallback={updateQty}
                />
            </td>
            <td>
                <DeleteButton
                    deleteCallback={deleteItem}
                />
            </td>
        </tr>
    );
};

export default ListItem;