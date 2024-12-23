import { Button, Card, CardBody, Input } from "@windmill/react-ui";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import SelectFilter from "./SelectFilter";
import ProductServices from "@/services/ProductServices";
import { FiSearch } from "react-icons/fi";
import { SidebarContext } from "@/context/SidebarContext";
import { useForm } from "react-hook-form";
import MultipleSelect from "./MultipleSelect";
import SelectStatus from "./SelectStatus";
const SearchFrom = ({
  selectFilter=[],
  register,
  handleSubmit,
  filterStatus,
  control,
}) => {
  const { t } = useTranslation();

  const { handleSubmitForAll, handleSubmitFilter } = useContext(SidebarContext);
  // ${
  //   selectFilter || selectFilter?.length > 0
  //     ? `grid-cols-${selectFilter.length + 2}`
  //     : "flex"
  // } md:${
  //   selectFilter || selectFilter?.length > 0
  //     ? `grid-cols-${selectFilter.length + 2}`
  //     : "flex"
  // } xl:${
  //   selectFilter || selectFilter?.length > 0
  //     ?  `grid-cols-${selectFilter.length + 2}`
  //     : "flex"
  // }

  return (
    <>
      <Card className="gap-4 md:justify-between bg-white p-3 m-2 border border-gray-100 rounded-lg">
        <CardBody>
          <form
            onSubmit={
              handleSubmit
                ? handleSubmit(handleSubmitFilter)
                : handleSubmitForAll
            }
            className={`py-3 grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-6`}
          >
            {selectFilter?.map((e, index) => {
              const Component = e?.component || SelectFilter;
              return (
                <div key={index} className="w-full relative">
                  <Component
                    register={register && register}
                    services={e?.services}
                    name={e?.name}
                    label={e?.label}
                    control={control && control}
                    type={e?.type}
                    options={e?.options}
                    optionLabel={e?.optionLabel}
                    optionValue={e?.optionValue}
                  />
                </div>
              );
            })}
            {filterStatus?.length && (
              <SelectStatus
                register={register && register}
                status={filterStatus}
                name="status"
              />
            )}
            <div className="w-full col-start-1">
              <Input
                {...(register && register("search"))}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white pl-4 pr-10"
                type="search"
                name="search"
                placeholder={t("Nhập thông tin tìm kiếm...")}
              />
            </div>

            <div className="w-full">
              <Button type="submit" className="w-full rounded-md h-12">
                <FiSearch /> {t("Search")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default SearchFrom;
