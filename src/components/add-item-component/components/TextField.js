const TextField = (props) => {
    
    // Helper function to update item name in AppItem context
    const handleTextChange = (e) => {
        props.itemNameChanger(e.target.value);
    };

    return (
        <input type="text" value={props.value} className="form-control addItemTextField" onChange={handleTextChange}/>
    );
};

export default TextField;