import SectionTitle from '@/components/Typography/SectionTitle'
import BlockControl from '@/components/control/BlockControl'
import RenderForm from '@/components/form/RenderForm'
import InfoCustomerModal from '@/components/modal/InfoCustomerModal'
import { SidebarContext } from '@/context/SidebarContext'
import useToggleInfoCustomerModal from '@/hooks/useToggleInfoCustomerModal'
import { Button, Card, CardBody, Label } from '@windmill/react-ui'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FcCollapse, FcExpand } from 'react-icons/fc'

const JobInfoCustomerDetailed = ({ register, errors, dataClient, setDataClient }) => {
  const { methodType, handeSearchInfo, handleAddCustomer } = useToggleInfoCustomerModal()
  const { t } = useTranslation()
  const { isInfoCustomerCollapsed, handleInfoCustomerToggle } = useContext(SidebarContext)

  const fieldArray = React.useMemo(() => [
    {
      label: t("Full name"),
      name: "full_name",
      placeholder: t("Input customer's full name"),
      disabled: false,
      value: dataClient?.full_name
    },
    {
      label: t("Legal ID"),
      name: "legal_id",
      placeholder: t("Input legal ID"),
      disabled: false,
      value: dataClient?.legal_id
    },
    {
      label: t("Phone"),
      name: "phone",
      type: "number",
      placeholder: t("Input phone number"),
      disabled: false,
      value: dataClient?.phone
    },
    {
      label: t("Address"),
      name: "address",
      placeholder: t("Input address"),
      disabled: false,
      value: dataClient?.address
    },
    {
      label: t("Email"),
      name: "email",
      placeholder: t("Input email address ..."),
      disabled: false,
      value: dataClient?.email
    },
  ], [dataClient]);

  return (
    <>
      <Card
        className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 ${isInfoCustomerCollapsed ? "collapsed" : ""}`}
        style={{
          height: isInfoCustomerCollapsed ? "80px" : "auto",
          overflow: isInfoCustomerCollapsed ? "hidden" : "visible",
        }}
      >
        <CardBody>
          <div className="w-full flex items-center justify-between my-2">
            <h1 className='text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600'>{t("CUSTOMER DETAILED")}</h1>
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

          <div className="flex items-center justify-between">
            <SectionTitle>{t("INFOMATION DETAILED")}</SectionTitle>
          </div>

          <div className="mb-2 py-2 gap-4 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <RenderForm fieldArray={fieldArray} register={register} errors={errors} />
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default JobInfoCustomerDetailed