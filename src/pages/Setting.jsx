import React from "react";
import { Button, Label, Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import Error from "@/components/form/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/InputAreaTwo";
import SelectTimeZone from "@/components/form/SelectTimeZone";
import PageTitle from "@/components/Typography/PageTitle";
import useSettingSubmit from "@/hooks/useSettingSubmit";
import useAsync from "@/hooks/useAsync";
import SettingServices from "@/services/SettingServices";
import LabelArea from "@/components/form/LabelArea";
import SelectCurrency from "@/components/form/SelectCurrency";
import SelectReceiptSize from "@/components/form/SelectPrintSize";
import InputArea from "@/components/form/InputArea";
import { Tabs } from "antd";
import { FiMail } from "react-icons/fi";

const Setting = () => {
  const { errors, register, handleSubmit, onSubmit, isSave, isSubmitting } =
    useSettingSubmit();
  const { t } = useTranslation();
  const fieldArray = [
    {
      label: t("Sendgrid Email"),
      name: "sendgrid_email",
      type: "email",
      placeholder: t("Sendgrid Email"),
      component: InputArea,
    },
    {
      label: t("Sendgrid Key"),
      name: "sendgrid_key",
      type: "text",
      placeholder: t("Sendgrid Key"),
      component: InputArea,
    },
  ];

  const tabItem = [
    {
      label: (
        <div className="flex items-center">
          <FiMail className="mr-1" />
          Cài đặt Email
        </div>
      ),
      children: fieldArray?.map((e) => {
        const Component = e?.component || InputArea;
        return (
          <div key={e?.name} className="py-2">
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
              {t(e?.label)}
            </label>
            <div className="sm:col-span-3">
              <Component
                register={register}
                label={t(e?.label)}
                name={t(e?.name)}
                placeholder={t(e?.placeholder)}
                type={t(e?.type)}
              />
              <Error errorName={errors.number_of_image_per_product} />
            </div>
          </div>
        );
      }),
      key: "email",
    },
  ];
  return (
    <>
      <PageTitle>{t("Cấu hình hệ thống")}</PageTitle>

      <div className="w-full p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row-reverse ">
            {isSubmitting ? (
              <Button disabled={true} type="button" className="h-12">
                <img
                  src={spinnerLoadingImage}
                  alt="Loading"
                  width={20}
                  height={10}
                />
                <span className="font-serif ml-2 font-light">Processing</span>
              </Button>
            ) : (
              <Button type="submit" className="h-12 px-8">
                {isSave ? "Lưu" : "Cập nhật"}
              </Button>
            )}
          </div>
          <Tabs tabPosition="left" items={tabItem} />
          {/* <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 font-sans">
            <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3 ">
              <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
                <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  {fieldArray?.map((e) => {
                    const Component = e?.component || InputArea;
                    return (
                      <>
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                          {t(e?.label)}
                        </label>
                        <div className="sm:col-span-3">
                          <Component
                            register={register}
                            label={t(e?.label)}
                            name={t(e?.name)}
                            placeholder={t(e?.placeholder)}
                            type={t(e?.type)}
                          />
                          <Error
                            errorName={errors.number_of_image_per_product}
                            pos
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="flex flex-row-reverse pb-6">
                  {isSubmitting ? (
                    <Button disabled={true} type="button" className="h-12">
                      <img
                        src={spinnerLoadingImage}
                        alt="Loading"
                        width={20}
                        height={10}
                      />{" "}
                      <span className="font-serif ml-2 font-light">
                        Processing
                      </span>
                    </Button>
                  ) : (
                    <Button type="submit" className="h-12 px-8">
                      {isSave ? "Lưu" : "Cập nhật"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form> */}
        </form>
      </div>
    </>
  );
};
export default Setting;
