import React, { useContext } from "react";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import { AdminContext } from "@/context/AdminContext";
import useStaffSubmit from "@/hooks/useStaffSubmit";
import PageTitle from "@/components/common/PageTitle";
import LabelArea from "@/components/form/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import InputArea from "@/components/form/InputArea";
import Error from "@/components/form/Error";
import SelectRole from "@/components/form/SelectRole";

const EditProfile = () => {
  const { t } = useTranslation();
  const {
    state: { adminInfo },
  } = useContext(AdminContext);

  const {
    register,
    handleSubmit,
    getValues,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    clearErrors,
  } = useStaffSubmit(adminInfo._id);

  return (
    <>
      <PageTitle> {t("EditProfile")} </PageTitle>
      <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfilePicture")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="customer"
                />
              </div>
            </div> */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfileName")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfileEmail")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfileContactNumber")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Contact Number"
                  name="phone"
                  type="text"
                  placeholder="Contact Number"
                />
                <Error errorName={errors.phone} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Mật khẩu mới (nhập nếu có thay đổi)")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Mật khẩu mới"
                  name="password"
                  type="password"

                  placeholder="Mật khẩu mới"
                />
                <Error errorName={errors.password} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Xác nhận mật khẩu mới")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  validation={(value, form) =>
                    value == form?.password
                      ? clearErrors("confirm_password")
                      : "Xác nhận mật khẩu chưa khớp"
                  }
                  register={register}
                  label="Xác nhận mật khẩu mới"
                  name="confirm_password"
                  type="password"
                  getValues={getValues}
                  placeholder="Xác nhận mật khẩu mới"
                />
                <Error errorName={errors.confirm_password} />
              </div>
            </div>

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfileYourRole")} />
              <div className="col-span-8 sm:col-span-4">
                <SelectRole register={register} label="Role" name="role" />
                <Error errorName={errors.role} />
              </div>
            </div> */}
          </div>

          <div className="flex flex-row-reverse pr-6 pb-6">
            <Button type="submit" className="h-12 px-6">
              {t("Cập nhật tài khoản")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
