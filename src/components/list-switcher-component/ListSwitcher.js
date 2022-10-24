import BackButton from "./components/BackButton.js";
import ForwardButton from "./components/ForwardButton.js";
import {useState,useContext} from "react";
import {ShoppingListContext,CurrentListContext} from "../../App.js";

const ListSwitcher = () => {
    const [listNum,setListNum] = useContext(CurrentListContext)
    const [items,setItems] = useContext(ShoppingListContext);

    const incrementListNum = () => {
        if(!(listNum+1 in Object.keys(items)))
        {
            let listItems = {...items};
            listItems[listNum+1] = {"items":{},"date":""};
            setItems(listItems);
        }
        setListNum((currListNum) => {return currListNum + 1})
    };

    const decrementListNum = () => {
        if (listNum > 0)
            setListNum((currListNum) => {return currListNum - 1})
    };

    const updateDate = (e) => {
        console.log(e.target.value);
        if (listNum in Object.keys(items))
        {
            let listItems = {...items};
            listItems[listNum]["date"] = e.target.value;
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