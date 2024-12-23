import dayjs from "dayjs";

const formatDate = (date = Date()) => dayjs(date).format("DD/MM/YYYY");

const formatDatetime = (date = Date()) =>
  dayjs(date).format("DD/MM/YYYY HH:mm");

const formatDatetimeWithSec = (date = Date()) =>
  dayjs(date)?.format("DD/MM/YYYY HH:mm:ss");
export { formatDate, formatDatetime, formatDatetimeWithSec };
