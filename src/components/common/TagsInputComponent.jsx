import React from "react";
import { Controller } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";

const TagsInputComponent = ({
  control,
  name,
  disabled,
  validate,
  placeholder,
}) => {
  return (
    <>
      {control && (
        <Controller
          control={control}
          name={name}
          rules={{ validate: validate ? validate : false }}
          render={({ field: { onChange, onBlur, ref, value } }) => (
            <TagsInput
              placeHolder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={value || []}
              disabled={disabled}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            />
          )}
        />
      )}
    </>
  );
};

export default TagsInputComponent;
