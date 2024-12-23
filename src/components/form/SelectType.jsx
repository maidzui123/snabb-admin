import React from 'react';
import { Select } from '@windmill/react-ui';
const SelectType = ({setType, register, name, label, value}) => {
  return (
    <>
      <Select
        onChange={setType}
        className="border h-12 text- focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue>
          Staff Type
        </option>
        <option value="TPA">TPA</option>
        <option value="AGENCY">AGENCY</option>
        <option value="PROVIDER">PROVIDER</option>
        <option value="RETAILER">RETAILER</option>
      </Select>
    </>
  );
};

export default SelectType;
