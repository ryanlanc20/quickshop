import BackButton from "./components/BackButton.js";
import ForwardButton from "./components/ForwardButton.js";
import {useState,useContext} from "react";
import {ShoppingListContext,CurrentListContext} from "../../App.js";

const ListSwitcher = () => {

    // Reference to shopping lists
    const [listNum,setListNum] = useContext(CurrentListContext)

    // Reference to current list index
    const [items,setItems] = useContext(ShoppingListContext);

    const incrementListNum = () => {

        // Create new list if index is not present in items list
        if(!(listNum+1 in Object.keys(items)))
        {
            // Copy list items (to force state update)
            let listItems = {...items};

            // Add new shopping list
            listItems[listNum+1] = {"items":{},"date":""};

            // Return collection to global storage
            setItems(listItems);
        }

        // Set selected list index
        setListNum((currListNum) => {return currListNum + 1})
    };

    const decrementListNum = () => {
        // Only decrease list index if > 0
        if (listNum > 0)
            setListNum((currListNum) => {return currListNum - 1})
    };

    const updateDate = (e) => {
        console.log(e.target.value);

        // Only update date if list is selected
        if (listNum in Object.keys(items))
        {
            // Copy collection (to force state update)
            let listItems = {...items};

            // Update the date
            listItems[listNum]["date"] = e.target.value;

            // Return collection to global storage
            setItems(listItems);
        }
    };

    return(
        <div className="container mb-4 list-switcher">
            <div class="row">
                <div class="col-md-2">
                    <div className="list-switcher-control container">
                        <BackButton
                            decrementCallback={decrementListNum}
                        />
                    </div>
                </div>
                <div class="col-md-8">
                    <div className="list-switcher-display">
                        <div class="row">
                            <div class="col-md-2">

                            </div>
                            <div class="col-md-8 text-center">
                                <h5>List # {listNum}</h5>
                            </div>
                            <div class="col-md-2">

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">

                            </div>
                            <div class="col-md-8 text-center">
                                <input type="date" id="birthday" name="birthday" className="form-control picker__input" onChange={updateDate} value={items[listNum]["date"]||""}></input>
                            </div>
                            <div class="col-md-2">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div className="list-switcher-control container">
                        <ForwardButton
                            incrementCallback={incrementListNum}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ListSwitcher;