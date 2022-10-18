
const QuantityEditor = (props) => {

    const decrement = () => {
        if (props.qty > 0)
            props.updateCallback(props.qty-1);
    };

    const increment = () => {
        props.updateCallback(props.qty+1);
    };

    return (
        <div className="input-group">
            <button className="btn btn-primary" onClick={decrement}>-</button>
            <div className="input-group-text">
                {props.qty}
            </div>
            <button className=" btn btn-primary" onClick={increment}>+</button>
        </div>
    )
};

export default QuantityEditor;