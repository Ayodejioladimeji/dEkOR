// components/CustomSelect.js
import React from "react";
import Select from "react-select";

const CustomSelect = ({
  options,
  placeholder,
  onChange,
  defaultValue,
  isDisabled,
}) => {
  //

  return (
    <Select
      value={defaultValue}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      isSearchable={true}
      className="basic-select"
      isDisabled={isDisabled}
      styles={{
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            border: "none",
            padding: "px",
            borderRadius: "5px",
            boxShadow: state.isFocused
              ? "0px 0px 0px 1px rgba(255, 198, 25, 1)"
              : "none",
            cursor: "pointer",
            // fontSize: "16px",
          };
        },
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#27493e",
          primary50: "#27493e",
          primary: "#27493e",
        },
      })}
    />
  );
};

export default CustomSelect;
