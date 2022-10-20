const PriceSelector = (props) => {
    
    // TODO: Prevent user from enter nothing and ensure proper formatting.

    // Helper function to update first currency unit value in AddItem context
    const updateFirstCurrencyUnit = (e) => {
        props.changeFirstCurrencyUnit(e.target.value);
    };

    // TODO: Prevent user from enter nothing and ensure proper formatting.
    
    // Helper function to update second currency unit value in AddItem context
    const updateSecondCurrencyUnit = (e) => {
        props.changeSecondCurrencyUnit(e.target.value);
    };
    
    return(
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">£</span>
            </div>
            <input type="number" className="form-control" aria-label="First currency unit" value={props.firstCurrencyUnit} onChange={updateFirstCurrencyUnit} pattern="^(0|[1-9]{1}[1-9]*)$"/>
            <input type="number" className="form-control" aria-label="Second currency unit" value={props.secondCurrencyUnit} onChange={updateSecondCurrencyUnit} pattern="^[0-9]{2}$" step="1" min="0" max="99"/>
        </div>
    )
};

export default PriceSelector;