import React, { useContext, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, TableContainer, Table, 
     TableBody, TableCell, TableRow, TableLoading, TableHeader, TableFooter, Pagination } from '@windmill/react-ui'
import { useTranslation } from "react-i18next";
import NotFound from "@/components/table/NotFound";
import useAsync from "@/hooks/useAsync";
import { SidebarContext } from "@/context/SidebarContext";
import HistoryTable from "@/components/history/HistoryTable";
import SettingServices from "@/services/SettingServices";

import AgencyHistoryServices from "@/services/AgencyHistoryServices";

const HistoryModal = ({id, services}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    currentHistoryPage,
    handleChangeHistoryPage,
    limitHistoryData,
  } = useContext(SidebarContext);

  const { data, loading } = useAsync(() => 
  services.getAll({
    page: currentHistoryPage,
    limit: limitHistoryData,
    id: id
  }));
  
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false)
  }

 
  const { t } = useTranslation();
  return (
    <>
        <div className="flex justify-end">
            <Button id="Historybtn" onClick={openModal} disabled={loading}>{t("HistoryUpdate")}</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>{t("History Update")}</ModalHeader>
        <ModalBody>
        <div className=" mt-10 ml-5 mr-5 flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            {loading ? (
               <TableLoading/>
            ) : data?.data?.length > 0 ? (
              <TableContainer className="mb-8 rounded-b-lg">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>{t("User")}</TableCell>
                      <TableCell>{t("Description")}</TableCell>
                    </tr>
                  </TableHeader>
                  <HistoryTable
                  data={data?.data}
                  />
                  {/* <TableBody>
                      {data?.data?.map((item, i) => (
                      <TableRow key={i + 1} className='hover:bg-gray-300'>
                          <TableCell>
                          <span className="text-sm">
                              {item?.created_by?.name.en}
                          </span>
                          </TableCell>
                          <TableCell>
                          <span className="text-sm">
                              {item?.desc}
                          </span>
                          </TableCell>
                      </TableRow>
                      ))}
                  </TableBody> */}
                  </Table>
                  <TableFooter>
                    <Pagination
                      totalResults={data?.totalDoc}
                      resultsPerPage={limitHistoryData}
                      onChange={handleChangeHistoryPage}
                      label="History Page Navigation"
                    />
                  </TableFooter>
              </TableContainer>
            ) : (
              <NotFound title={t("Lịch sử chỉnh sửa")} />
            )}
          </div>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={closeModal}>
            {t("Close")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}


export default  HistoryModal;