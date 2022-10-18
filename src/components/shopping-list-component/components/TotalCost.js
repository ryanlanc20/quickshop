const TotalCost = (props) => {
    return(
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Total</span>
            </div>
            <div className="input-group-prepend">
                <span className="input-group-text">£</span>
            </div>
            <div className="input-group-text" style={{"background-color":"#ffffff"}}>
                {props.cost}
            </div>
        </div>
)
}

export default TotalCost;