import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReportServices from "@/services/ReportServices";
import useAsync from "@/hooks/useAsync";
import InputArea from "@/components/form/InputArea";
import { FiChevronLeft, FiChevronsUp, FiDownload } from "react-icons/fi";
import {
  Label,
  Button,
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  TableBody,
  TableRow,
  Select,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { formatDatetime } from "@/utils/date.helper";
import { notifyError } from "@/utils/toast";
import ExportReportModal from "@/components/modal/ExportReportModal";
import useReportSubmit from "@/hooks/useReportSubmit";
import useToggleExportReportModal from "@/hooks/useToggleExportReportModal";
const ReportDetailed = () => {
  const { id } = useParams();

  const { data, loading, error } = useAsync(() =>
    ReportServices.getReportById(id)
  );
  // const { register } = useReportSubmit();
  const dataFields = data?.data?.fields;
  const parsedData = data?.parsedData;

  const { t } = useTranslation();
  const { handleExportReport } = useToggleExportReportModal();
  useEffect(() => {
    error && notifyError(error);
  }, [error]);

  return (
    <>
      <ExportReportModal />
      <div className=" flex flex-col bg-gray-50 p-2 m-2 w-full">
        <Link
          className=" w-24 mt-4 mb-4 text-red-500 hover:text-red-600 cursor-pointer flex items-center"
          to="/report"
        >
          <FiChevronLeft className="text-2xl" />
          <span>Trở lại</span>
        </Link>
        <Card className=" shadow-xs p-4">
          <div className=" flex flex-col">
            <Label className=" text-left p-2 text-3xl text-blue-600 font-bold">
              {data?.data?.name}
            </Label>
            <div className="p-2  flex gap-2 sm:flex-wrap justify-between">
              <div className="flex">
                {/* <div className="mr-4">
                <div className="mr-8">
                  <Label className="text-md mb-1">Tên báo cáo</Label>
                  <Label className=" text-lg font-semibold text-blue-600">
                    {data?.data?.name}
                  </Label>
                </div>
                <div className="mr-4">
                </div> */}
                <div className="mr-8">
                  <Label className="text-md mb-1">Mã</Label>
                  <Label className=" text-lg font-semibold text-blue-600">
                    {data?.data?.code}
                  </Label>
                </div>
                {/* <div className="mr-4">
                  <Label className="text-md mb-1">Loại</Label>
                  <Label className=" text-lg font-semibold text-blue-600">
                    {data?.data?.query}
                  </Label>
                </div> */}
                <div className="mr-4">
                  <Label className="text-md mb-1">Người tạo</Label>
                  <Label className=" text-lg font-semibold text-blue-600">
                    {data?.data?.created_by?.name?.vi}
                  </Label>
                </div>
                <div className="mr-4">
                  <Label className="text-md mb-1">Thời gian</Label>
                  <Label className=" text-lg font-semibold text-blue-600">
                    {formatDatetime(data?.data?.createdAt)}
                  </Label>
                </div>
              </div>
              <div className=" flex gap-2">
                <div className=" w-300">
                  <InputArea placeholder={"Tìm kiếm"} />
                </div>
                <div className="">
                  <Button className="flex-grow-1 h-12 " type="submit">
                    Tìm kiếm
                  </Button>
                </div>
                <div className="">
                  <Button onClick={() => handleExportReport()} className="flex-grow-1 h-12 ">
                    <FiDownload />
                    <span className="ml-2">Xuất file CSV</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className=" m-2">
              <TableContainer className=" rounded-b-lg">
                <Table>
                  <TableHeader>
                    <tr>
                      {dataFields?.map((item, index) => (
                        <TableCell key={index} className="text-center">
                          {item}
                        </TableCell>
                      ))}
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {parsedData?.map((eachData, i) => (
                      <TableRow
                        key={i + 1}
                        className="hover:bg-gray-300 text-center"
                      >
                        {dataFields?.map((field, index) => (
                          <TableCell key={index}>
                            <span className="text-sm">{eachData[field]}</span>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ReportDetailed;
