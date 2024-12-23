// import {
//   Button,
//   Input,
//   Label,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   Select,
//   Table,
//   TableHeader,
//   TableCell,
//   TableFooter,
//   Pagination,
//   TableContainer,
//   TableBody,
//   TableRow,
// } from "@windmill/react-ui";
// import CheckBox from "@/components/form/CheckBox";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import TableLoading from "@/components/preloader/TableLoading";

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { FiCheck, FiX, FiSearch, FiArrowLeft } from "react-icons/fi";
// import { useTranslation } from "react-i18next";

// //internal import
// import spinnerLoadingImage from "@/assets/img/spinner.gif";
// import { SidebarContext } from "@/context/SidebarContext";

// import Tooltip from "@/components/tooltip/Tooltip";
// import InputArea from "../form/InputArea";
// import { useForm } from "react-hook-form";
// import SelectAgency from "../form/SelectAgency";
// import AgencyServices from "@/services/AgencyServices";
// import useAsync from "@/hooks/useAsync";
// import Status from "../table/Status";
// import NotFound from "../table/NotFound";
// import AccessoryServices from "@/services/AccessoryServices";
// import useAccessoryFilter from "@/hooks/useAccessoryFilter";
// import { id } from "date-fns/locale";
// import { hasFormatNumber } from "@/helper/fomatNum.helper";
// const AgencyConfirmAccessoryModal = ({
//   jobId,
//   register,
//   current,
//   getValues,
//   handleSubmit,
//   handleSaveAgencySelectAccessory,
// }) => {
//   const {
//     limitData,
//     searchText,
//     isAgencyConfirmAccessoryModalOpen,
//     closeAgencyConfirmAccessoryModal,
//     setIsUpdate,
//     currentPage,
//     handleChangePage,
//     handleSubmitForAll,
//     handleSubmitFilter,
//   } = useContext(SidebarContext);
//   const { data, loading } = useAsync(() =>
//     AccessoryServices.getAllByAgency({
//       ...getValues(),
//       page: currentPage,
//       limit: 5,
//       job_id: jobId,
//     })
//   );
//   const { serviceData } = useAccessoryFilter(data?.data);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { t } = useTranslation();
//   const [isCheck, setIsCheck] = useState({});
//   const handleChooseAccessory = (id, price, VAT) => {
//     setIsCheck((preChecked) => ({
//       ...preChecked,
//       [id]: !preChecked[id],
//     }));
//     setTotalPrice((prevTotalPrice) => {
//       const eachPrice = parseFloat(price.replace(/,/g, ""));
//       const eachVAT = parseFloat(VAT);
//       const total = isCheck[id]
//         ? -1 * (eachPrice + (eachPrice * eachVAT) / 100)
//         : eachPrice + (eachPrice * eachVAT) / 100;
//       return prevTotalPrice + total;
//     });
//     // Object.keys(agency_id).filter(key => agency_id[key])
//     // setListAccessory(Object.keys(isCheck).filter(key => isCheck[key]))
//   };
//   return (
//     <Modal
//       isOpen={isAgencyConfirmAccessoryModalOpen}
//       onClose={closeAgencyConfirmAccessoryModal}
//     >
//       <form>
//         <ModalBody
//           style={{
//             maxHeight: "80vh",
//             marginBottom: "0px",
//             paddingBottom: "0px",
//           }}
//           className="text-center px-4 pt-2 pb-6 overflow-scroll"
//         >
//           <div className="flex py-2 pb-4 items-center justify-between w-full text-center">
//             <h2 className="text-2xl font-semibold mt-2 text-blue-600 uppercase w-full text-center">
//               {t("Chọn linh kiện và báo giá")}
//             </h2>
//           </div>
//           <div className="flex gap-2 py-2">
//             {/* <Label className="">{t("Legal ID")} <span className="text-red-500">*</span></Label> */}
//             <InputArea
//               register={register}
//               name="search"
//               type="search"
//               placeholder={t("Tìm kiếm linh kiện ...")}
//               // onChange={() => setIsUpdate(true)}
//             />

//             <Button
//               onClick={handleSubmit(handleSubmitFilter)}
//               type="submit"
//               className="flex items-center w-40 sm:w-40 px-4 gap-2"
//             >
//               <FiSearch className="text-lg" />
//               {t("Search")}
//             </Button>

//             {/* <Error errorName={errors.legal_id} /> */}
//           </div>
//           <div className="pt-6 pb-6">
//             {/* <SelectAgency register={register} label="Agency" name="agency_id" /> */}
//             {loading ? (
//               <TableLoading row={12} col={7} width={160} height={20} />
//             ) : serviceData?.length > 0 ? (
//               <TableContainer className=" rounded-b-lg">
//                 <Table>
//                   <TableHeader>
//                     <tr>
//                       <TableCell className="text-center">
//                         {t("Hành động")}
//                       </TableCell>
//                       <TableCell className="text-center">{t("Name")}</TableCell>
//                       <TableCell className="text-center">{t("Code")}</TableCell>
//                       <TableCell className="text-center">
//                         {t("Category")}
//                       </TableCell>

//                       <TableCell className="text-center">
//                         {t("Price")}
//                       </TableCell>
//                       <TableCell className="text-center">{t("VAT")}</TableCell>
//                     </tr>
//                   </TableHeader>
//                   <TableBody>
//                     {data?.data?.map((item, i) => (
//                       <TableRow key={i + 1} className="hover:bg-gray-300">
//                         <TableCell>
//                           <div className="flex justify-center text-right">
//                             <Button
//                               onClick={() =>
//                                 handleChooseAccessory(
//                                   item?._id,
//                                   item?.price,
//                                   item?.VAT
//                                 )
//                               }
//                               className="flex items-center px-4 gap-2 bg-blue-500 hover:bg-blue-600"
//                             >
//                               {/* <FiCheck className="text-sm" /> */}
//                               {isCheck[item?._id] ? "Đã Chọn" : "Chọn"}
//                             </Button>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <span className="text-sm">{item?.name}</span>
//                         </TableCell>
//                         <TableCell>
//                           <span className="text-sm">{item?.code}</span>
//                         </TableCell>

//                         <TableCell>
//                           <span className="text-sm">
//                             {item?.category?.map((e, index, array) => (
//                               <>
//                                 <div key={index}>{e?.name}</div>
//                               </>
//                             ))}
//                           </span>
//                         </TableCell>

//                         <TableCell>
//                           <span className="text-sm">{item?.price}</span>
//                         </TableCell>
//                         <TableCell>
//                           <span className="text-sm">{item?.VAT}</span>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//                 <TableFooter>
//                   <Pagination
//                     totalResults={data?.totalDoc}
//                     resultsPerPage={5}
//                     onChange={handleChangePage}
//                     label="Accessory Page Navigation"
//                   />
//                 </TableFooter>
//               </TableContainer>
//             ) : (
//               <NotFound title="Linh kiện" />
//             )}
//           </div>
//           <div className="mb-6">
//             <h1 className=" text-xl">
//               Tổng Giá Tiền: {hasFormatNumber(totalPrice)} VNĐ
//             </h1>{" "}
//           </div>
//         </ModalBody>

//         <ModalFooter className="justify-center items-center flex">
//           <Button
//             className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
//             layout="outline"
//             onClick={closeAgencyConfirmAccessoryModal}
//           >
//             {t("Cancel")}
//           </Button>
//           <Button
//             className="flex btn-red items-center w-full sm:w-auto px-4 gap-2"
//             type="submit"
//             // onClick={handleSubmit()}
//           >
//             <FiX className="text-lg" />
//             {t("Không Duyệt")}
//           </Button>
//           <Button
//             className="flex items-center w-full sm:w-auto px-4 gap-2"
//             type="submit"
//             onClick={handleSubmit(
//               handleSaveAgencySelectAccessory(isCheck, totalPrice, current, "process")
//             )}
//           >
//             <FiCheck className="text-lg" />
//             {t("Duyệt")}
//           </Button>
//         </ModalFooter>
//       </form>
//     </Modal>
//   );
// };

// export default React.memo(AgencyConfirmAccessoryModal);
