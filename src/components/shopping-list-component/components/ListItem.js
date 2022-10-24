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
    const [items,setItems] = useContext(ShoppingListContext);
    const [currentList,] = useContext(CurrentListContext);
    const [status,setStatus] = useState(null);

    const updateFirstCurrencyUnit = (firstCurrencyUnit) => {
        if(!WholeNumberValidator(firstCurrencyUnit))
        {
            setStatus({"type":"wholenumfail"});
            return;
        }
        let collection = {...items};
        collection[currentList]["items"][props.id]["firstCurrencyUnit"] = parseInt(firstCurrencyUnit);
        setItems(collection);
        setStatus(null);
    };

    const updateSecondCurrencyUnit = (secondCurrencyUnit) => {
        if(!fractionalValidator(secondCurrencyUnit))
        {
            setStatus({"type":"fractnumfail"});
            return;
        }
        let collection = {...items};
        collection[currentList]["items"][props.id]["secondCurrencyUnit"] = parseInt(secondCurrencyUnit);
        setItems(collection);
        setStatus(null);
    };

    const updateQty = (qty) => {
        let collection = {...items};
        collection[currentList]["items"][props.id]["qty"] = parseInt(qty);
        setItems(collection);
    };

    const updateName = (name) => {
        if(itemNameValidator(name))
        {
            setStatus({"type":"itemnamefail"});
        }
        let collection = {...items};
        collection[currentList]["items"][props.id]["itemName"] = name;
        setItems(collection);
        setStatus(null);
    }

    const deleteItem = () => {
        let collection = {...items};
        delete collection[currentList]["items"][props.id];
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