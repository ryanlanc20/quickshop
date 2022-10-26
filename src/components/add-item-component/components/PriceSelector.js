const PriceSelector = (props) => {
    
    // Callback function to update first currency unit value in AddItem context
    const updateFirstCurrencyUnit = (e) => {
        props.changeFirstCurrencyUnit(e.target.value);
    };
    
    // Callback function to update second currency unit value in AddItem context
    const updateSecondCurrencyUnit = (e) => {
        props.changeSecondCurrencyUnit(e.target.value);
    };
    
    return(
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">£</span>
            </div>
            <input type="number" className="form-control" aria-label="First currency unit" value={props.firstCurrencyUnit} onChange={updateFirstCurrencyUnit}/>
            <input type="number" className="form-control" aria-label="Second currency unit" value={props.secondCurrencyUnit} onChange={updateSecondCurrencyUnit} step="1" min="0" max="99"/>
        </div>
    )
};

export default PriceSelector;