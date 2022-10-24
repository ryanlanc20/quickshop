import ListItem from "./components/ListItem.js";
import TotalCost from "./components/TotalCost.js";
import {useContext,useMemo} from "react";
import { ShoppingListContext, CurrentListContext} from "../../App.js";

const ShoppingList = (props) => {
    const [items,] = useContext(ShoppingListContext);
    const [currentList,] = useContext(CurrentListContext);

    const totalCost = useMemo(
        () => {
            return Object.values(items[currentList]["items"]).map((item) => {
                return Math.round(((item.firstCurrencyUnit+ (item.secondCurrencyUnit/100)) * item.qty)*100) / 100
            }).reduce((previous,current) => previous + current,0).toFixed(2)
        },
        [items,currentList]
    );

    return (
            <div className="container mt-4 mb-4">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="float-left">
                                <i className="bi bi-cart4"></i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                </svg>
                            </div>
                            <h5 className="ml-2 mt-1 float-left">
                            Shopping list
                            </h5>
                        </div>
                        <div class="col-md-3">
                        <TotalCost
                            cost={totalCost}
                        />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                <table className="table table-light">
                    <thead>
                        <tr>
                        <th>Item name</th>
                        <th>Item price</th>
                        <th>Item Qty.</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(items[currentList]["items"]).map(id => 
                            (
                                <ListItem 
                                    key={items[currentList]["items"][id].id} 
                                    id={items[currentList]["items"][id].id} 
                                    itemName={items[currentList]["items"][id].itemName} 
                                    firstCurrencyUnit={items[currentList]["items"][id].firstCurrencyUnit} 
                                    secondCurrencyUnit={items[currentList]["items"][id].secondCurrencyUnit} 
                                    qty={items[currentList]["items"][id].qty}
                                />
                            )
                        )
                    }
                    </tbody>
                </table>
                </div>
                <div className="card-footer">
                    <div class="row">
                        <div class="col-md-9"></div>
                        <div class="col-md-3">
                        <TotalCost
                            cost={totalCost}
                        />
                        </div>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default ShoppingList;