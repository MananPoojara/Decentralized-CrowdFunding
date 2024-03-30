import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-white mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          rows={10}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-green-500 rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          type={inputType}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          step="0.1"
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-green-500 rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
