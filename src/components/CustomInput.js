import React from "react";

const CustomInput = (props) => {
  const {
    type,
    label,
    id,
    className,
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled,
  } = props;
  return (
    <div className="form-input mt-3">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        className={`form-control ${className}`}
        id={id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CustomInput;
