import { Label } from "@windmill/react-ui";
import React from "react";
import InputArea from "./InputArea";
import TextAreaCom from "./TextAreaCom";
import Error from "./Error";
import { useTranslation } from "react-i18next";
const RenderForm = ({ fieldArray, register, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      {fieldArray?.map((e, i) => {
        const Component = e.component || InputArea;
        return (
          <div className="w-full" key={i}>
            <Label className="sm:text-sm mb-1">
              {t(e?.label)}{" "}
              {e?.required && (
                <span className="text-red-500 font-semibold">*</span>
              )}
            </Label>
            <div className="col-span-8 sm:col-span-4">
              <Component
                register={register}
                getValues={e?.getValues}
                setValue={e?.setValue}
                label={e?.label ?? ""}
                name={e?.name}
                type={e?.type ?? "text"}
                placeholder={e?.placeholder}
                options={e?.options}
                isMulti = {e?.isMulti}
                autoFocus={e?.autoFocus ?? false}
                disabled={e?.disabled ?? false}
                onChange={e?.onChange}
                defaultValue={e?.defaultValue}
                required={e?.required ?? false}
                services={e?.services ?? false}
                control={e?.control ?? false}
                readOnly={e?.readOnly ?? false}
                value={e?.value}
                totalPrice={e?.totalPrice}
                setTotalPrice={e?.setTotalPrice}
                setReplaceType={e?.setReplaceType}
              />
              <Error errorName={errors[e?.name]} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RenderForm;
