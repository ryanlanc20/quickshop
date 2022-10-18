const WholeNumberValidator = (strVal) => {
    return (strVal.match(/^(0|[1-9]{1}[1-9]*)$/g));
}

export default WholeNumberValidator;