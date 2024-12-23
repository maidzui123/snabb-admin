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

const JobInfoCustomer = ({ register, errors, dataClient, setDataClient, isDisabled }) => {
  const { methodType, setMethodType, available, setAvailable, handeSearchInfo, handleAddCustomer } = useToggleInfoCustomerModal()
  const { t } = useTranslation()
  const { isInfoCustomerCollapsed, handleInfoCustomerToggle } = useContext(SidebarContext)
  const fieldArray = React.useMemo(() => [
    {
      label: t("Full name"),
      name: "full_name",
      placeholder: t("Input customer's full name"),
      disabled: isDisabled,
      value: dataClient?.full_name
    },
    {
      label: t("Legal ID"),
      name: "legal_id",
      placeholder: t("Input legal ID"),
      disabled: isDisabled,
      value: dataClient?.legal_id
    },
    {
      label: t("Phone"),
      name: "phone",
      type: "number",
      placeholder: t("Input phone number"),
      disabled: isDisabled,
      value: dataClient?.phone
    },
    {
      label: t("Address"),
      name: "address",
      placeholder: t("Input address"),
      disabled: isDisabled,
      value: dataClient?.address
    },
    {
      label: t("Email"),
      name: "email",
      placeholder: t("Input email address ..."),
      disabled: isDisabled,
      value: dataClient?.email
    },
  ], [dataClient]);

  return (
    <>
      <InfoCustomerModal
        methodType={methodType}
        setMethodType={setMethodType}
        available={available}
        setAvailable={setAvailable}
        handleAddCustomer={handleAddCustomer}
        setDataClient={setDataClient}
      />

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

          <div className='w-full md:w-1/3 lg:1/4 mx-auto my-2'>
            <BlockControl>
              <Button className='flex-grow' onClick={handeSearchInfo}>{t("Search customer's information")}</Button>
              {/* <Button className='flex-grow' onClick={handleAddCustomer}>{t("Create new customer")}</Button> */}
            </BlockControl>
          </div>

          <div className="flex items-center justify-between">
            <SectionTitle>{t("INFOMATION DETAILED")}</SectionTitle>
          </div>

          <div className="mb-2 py-2 gap-2 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            <RenderForm fieldArray={fieldArray} register={register} errors={errors} />
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default JobInfoCustomer