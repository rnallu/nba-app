import React from "react";

const RenderField = props => {
  const renderFormat = () => {
    return Object.keys(props.data).map(obj => {
      return formatField(props.data[obj], obj);
    });
  };

  const formatField = (data, key) => {
    switch (data.element) {
      case "input":
        return (
          <div className="form-item" key={key}>
            <label>{data.label}</label>
            <input
              {...data.config}
              onBlur={event => renderValue(event, key, true)}
              onChange={event => renderValue(event, key, false)}
            />
            {showValidation(data)}
          </div>
        );
      case "select":
        return (
          <select
            value={data.value}
            name={data.config.name}
            onBlur={event => renderValue(event, key, true)}
            onChange={event => renderValue(event, key, false)}
            key={data.config.name}
          >
            {data.config.options.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const showValidation = data => {
    let errorMsg = null;
    if (data.validationMsg && !data.valid) {
      errorMsg = <div className="errorMsg">{data.validationMsg}</div>;
    }
    return errorMsg;
  };

  const renderValue = (event, key, blur) => {
    const newState = props.data;
    newState[key].value = event.target.value;

    if (blur) {
      let validData = validateForm(newState[key]);
      newState[key].valid = validData[0];
      newState[key].validationMsg = validData[1];
    }
    newState[key].touched = blur;
    props.change(newState);
  };

  const validateForm = element => {
    let errorData = [true, ""];

    if (element.validation.password) {
      const valid = element.value.length >= 6;
      const message = `${!valid ? "Must be more than 5 characters" : ""}`;
      errorData = !valid ? [valid, message] : errorData;
    }

    if (element.validation.email) {
      const valid = /\S+@\S+\.\S/.test(element.value);
      const message = `${!valid ? "Must be an valid email" : ""}`;
      errorData = !valid ? [valid, message] : errorData;
    }
    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;
      errorData = !valid ? [valid, message] : errorData;
    }

    return errorData;
  };

  return <div>{renderFormat()}</div>;
};

export default RenderField;
