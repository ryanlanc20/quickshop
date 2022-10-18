import PriceSelector from "../../add-item-component/components/PriceSelector.js";
import QuantityEditor from "./QuantityEditor.js";
import { ShoppingListContext, CurrentListContext } from "../../../App.js";
import EditableTextField  from "./EditableTextField.js";
import {useContext,useState} from "react";
import WholeNumberValidator from "../../../validators/WholeNumberValidator.js";
import fractionalValidator from "../../../validators/FractionalValidator.js";
import itemNameValidator from "../../../validators/ItemNameValidator.js";

const ListItem = (props) => {
    const [items,setItems] = useContext(ShoppingListContext);
    const [currentList,] = useContext(CurrentListContext);
    const [status,setStatus] = useState(null);

    const updatePounds = (pounds) => {
        let collection = {...items};
        collection[currentList]["items"][props.id]["pounds"] = parseInt(pounds);
        setItems(collection);
        setStatus(null);
    };

    const updatePennies = (pennies) => {
        let collection = {...items};
        collection[currentList]["items"][props.id]["pennies"] = parseInt(pennies);
        setItems(collection);
    };

    const updateQty = (qty) => {
        let collection = {...items};
        collection[currentList]["items"][props.id]["qty"] = parseInt(qty);
        setItems(collection);
    };

    const updateName = (name) => {
        let collection = {...items};
        collection[currentList]["items"][props.id]["itemName"] = name;
        setItems(collection);
    }

    return(
        <tr className={status ? "alert-danger" : ""}>
            <td><EditableTextField text={props.itemName} id={props.id} updateCallback={updateName}/></td>
            <td><PriceSelector pounds={props.pounds} pennies={props.pennies} changePounds={updatePounds} changePennies={updatePennies}/></td>
            <td><QuantityEditor qty={props.qty} updateCallback={updateQty}/></td>
        </tr>
    );
};

export default ListItem;