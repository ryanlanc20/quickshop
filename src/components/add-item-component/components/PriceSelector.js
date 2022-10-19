const PriceSelector = (props) => {
    
    // TODO: Prevent user from enter nothing and ensure proper formatting.

    // Helper function to update pounds value in AddItem context
    const updatePounds = (e) => {
        if(props.changePounds)
            props.changePounds(e.target.value);
    };

    // TODO: Prevent user from enter nothing and ensure proper formatting.
    
    // Helper function to update pennies value in AddItem context
    const updatePennies = (e) => {
        if(props.changePennies)
            props.changePennies(e.target.value);
    };
    
    return(
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">£</span>
            </div>
            <input type="number" className="form-control" aria-label="Pounds" value={props.pounds} onChange={updatePounds} pattern="^(0|[1-9]{1}[1-9]*)$"/>
            <input type="number" className="form-control" aria-label="Pence" value={props.pennies} onChange={updatePennies} pattern="^[0-9]{2}$" step="1" min="0" max="99"/>
        </div>
    )
};

export default PriceSelector;