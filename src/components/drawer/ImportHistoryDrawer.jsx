import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Card, CardBody, Input, Label,Textarea } from '@windmill/react-ui';

import Title from '@/components/form/Title';
import Error from '@/components/form/Error';
import LabelArea from '@/components/form/LabelArea';
import InputArea from '@/components/form/InputArea';
import SelectImportHistory from '@/components/form/SelectImportHistory';
import DrawerButton from '@/components/form/DrawerButton';
import Uploader from '@/components/image-uploader/Uploader';
import useImportHistorySubmit from '@/hooks/useImportHistorySubmit';
import { useTranslation } from 'react-i18next';
import TextAreaCom from "@/components/form/TextAreaCom";


const ImportHistoryDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = useImportHistorySubmit(id);

  const {t} = useTranslation();

   const fieldArray = React.useMemo(
    () => [
      {
        label: t("ImportHistory name"),
        name: "name",
        type: "text",
        placeholder: t("ImportHistory name"),
        component: InputArea,
      },
      {
        label: t("ImportHistory description"),
        name: "description",
        type: "textarea",
        rows: "4",
        placeholder: t("ImportHistory description"),
        component: TextAreaCom,
      },
    ],
    []
  );
  
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title= {t("Update ImportHistory")}
            description= {t("Updated ImportHistory")}
          />
        ) : (
          <Title
            title= {t("Add ImportHistory")}
            description= {t("Add ImportHistory")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {fieldArray?.map((e) => {
                 const Component = e?.component || InputArea;
                  return (
                    <>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label={e?.label} />
                        <div className="col-span-8 sm:col-span-4">
                          <Component
                            register={register}
                            label={e?.label}
                            name={e?.name}
                            type={e?.type}
                            placeholder={e?.placeholder}
                            autoFocus={true}
                          />
                          <Error errorName={errors[e?.name]} />
                        </div>
                      </div>
                    </>
                  );
                })}
               
              </div>
              
              <DrawerButton id={id} title={ t("ImportHistory")} isSubmitting={isSubmitting} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default ImportHistoryDrawer;
