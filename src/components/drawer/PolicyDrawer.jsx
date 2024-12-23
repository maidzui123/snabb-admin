import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectPolicy from "@/components/form/SelectPolicy";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import usePolicySubmit from "@/hooks/usePolicySubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import InputMoneyArea from "../form/InputMoneyArea";
import { hasPermission } from "@/helper/permission.helper";
const PolicyDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    isSubmitting,
  } = usePolicySubmit(id);

  const { t } = useTranslation();

  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Mã hợp đồng"),
        name: "policy_code",
        type: "text",
        placeholder: t("Mã hợp đồng"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Code"),
        name: "code",
        type: "text",
        placeholder: t("Code"),
        component: InputArea,
        labelRequired: true,
      },
      
      {
        label: t("Tên khách hàng"),
        name: "client_name",
        type: "text",
        placeholder: t("Tên khách hàng"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Giấy tờ"),
        name: "client_legal_id",
        type: "text",
        placeholder: t("Giấy tờ"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Ngày sinh"),
        name: "client_birthday",
        type: "date",
        placeholder: t("Ngày sinh"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Số điện thoại"),
        name: "client_phone",
        type: "text",
        placeholder: t("Số điện thoại"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Email"),
        name: "client_email",
        type: "text",
        placeholder: t("Email"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Địa chỉ"),
        name: "client_address",
        type: "text",
        placeholder: t("Địa chỉ"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Nhà cung cấp BH"),
        name: "insurance_provider_code",
        type: "text",
        placeholder: t("Nhà cung cấp BH"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Sản phẩm BH"),
        name: "insurance_product_code",
        type: "text",
        placeholder: t("Sản phẩm BH"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Phí BH"),
        name: "insurance_premium",
        type: "text",
        placeholder: t("Phí BH"),
        component: InputMoneyArea,
        labelRequired: true,
      },
      {
        label: t("Ngày bắt đầu hiệu lực"),
        name: "start_time",
        type: "date",
        placeholder: t("Ngày bắt đầu hiệu lực"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Ngày kết thúc hiệu lực"),
        name: "end_time",
        type: "date",
        placeholder: t("Ngày kết thúc hiệu lực"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Tên thiết bị"),
        name: "device_name",
        type: "text",
        placeholder: t("Tên thiết bị"),
        component: InputArea,
        labelRequired: true,
      },

      {
        label: t("Loại thiết bị"),
        name: "device_type",
        type: "text",
        placeholder: t("Loại thiết bị"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Imei"),
        name: "device_imei",
        type: "text",
        placeholder: t("Imei"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Hãng"),
        name: "device_brand",
        type: "text",
        placeholder: t("Hãng"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Số sêri"),
        name: "device_serial_number",
        type: "text",
        placeholder: t("Số sêri"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Dòng thiết bị"),
        name: "device_model",
        type: "text",
        placeholder: t("Dòng thiết bị"),
        component: InputArea,
        labelRequired: true,
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Chi tiết hợp đồng bảo hiểm")}
            description={t("Chi tiết hợp đồng bảo hiểm")}
          />
        ) : (
          <Title
            title={t("Thêm Hợp Đồng Bảo Hiểm")}
            description={t("Thêm Hợp Đồng Bảo Hiểm")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {fieldArray?.map((e) => {
                  const Component = e.component || InputArea;
                  return (
                    <div
                      className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                      key={e?.name}
                    >
                      <LabelArea
                        label={e?.label}
                        labelRequired={e?.labelRequired}
                      />
                      <div className="col-span-8 sm:col-span-4">
                        <Component
                          register={register}
                          label={e?.label}
                          name={e?.name}
                          type={e?.type}
                          placeholder={e?.placeholder}
                          onChange={e?.onChange}
                          autoFocus={true}
                          disabled={e?.disabled ?? !hasPermission("policy.update")}
                          required={true}
                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <DrawerButton
                id={id}
                title={t("Policy")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default PolicyDrawer;
