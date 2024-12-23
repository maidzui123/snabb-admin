import SectionTitle from '@/components/Typography/SectionTitle'
import BlockControl from '@/components/control/BlockControl'
import Error from '@/components/form/Error'
import InputArea from '@/components/form/InputArea'
import LabelArea from '@/components/form/LabelArea'
import RenderForm from '@/components/form/RenderForm'
import TextAreaCom from '@/components/form/TextAreaCom'
import { SidebarContext } from '@/context/SidebarContext'
import { Button, Card, CardBody, Label } from '@windmill/react-ui'
import { FcExpand, FcCollapse } from 'react-icons/fc'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { formatDatetime } from '@/utils/date.helper'

const JobInfoAdditional = ({ register, errors, dataClient, status }) => {
  const { t } = useTranslation()
  const {
    isInfoCustomerCollapsed,
    handleInfoCustomerToggle
  } = useContext(SidebarContext);

  const fieldArray = React.useMemo(() => [
    {
      label: t("Date created"),
      name: "date_created",
      disabled: true,
      value: formatDatetime(dataClient?.createdAt)
    },
    {
      label: t("Creator"),
      name: "creator",
      disabled: true,
      // value: dataClient?.created_by
    },
    {
      label: t("Status"),
      name: "status",
      disabled: true,
      value: status
    },
    {
      label: t("Approver"),
      name: "approver",
      disabled: true
    },
  ], [dataClient]);

  return (
    <Card
      className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 ${isInfoCustomerCollapsed ? "collapsed" : ""}`}
      style={{
        height: isInfoCustomerCollapsed ? "60px" : "auto",
        overflow: isInfoCustomerCollapsed ? "hidden" : "visible",
      }}
    >
      <CardBody>
        <div className="w-full flex items-center justify-between my-2">
          <h1 className='text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600'>{t("INFOMATION ADDITIONAL")}</h1>
          <div className="icon-container flex justify-end items-center">
            <span className="icon text-2xl" onClick={handleInfoCustomerToggle}>
              {isInfoCustomerCollapsed ? (
                <FcExpand />
              ) : (
                <FcCollapse />
              )}
            </span>
          </div>
        </div>

        <div className="mb-2 py-2 gap-4 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <RenderForm fieldArray={fieldArray} register={register} errors={errors} />
        </div>
      </CardBody>
    </Card>
  )
}

export default JobInfoAdditional