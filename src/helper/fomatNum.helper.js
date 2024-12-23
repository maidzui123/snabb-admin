export const hasFormatNumber = (number) => {
  const formatNumber = Number(number).toLocaleString("en-US");
  return Number(number).toLocaleString("en-US");
};

export const formatStringToNumber = (str) => {
  return parseFloat(str?.replace(/,/g, ""));
};
// const normalizeNumber = (v, key) => {
//     if (Number.isInteger(Number(v?.replaceAll(",", "")))) {
//       setValue(key, number(Number(v?.replaceAll(",", ""))));
//     } else {
//       setValue(
//         key,
//         number(
//           Number(
//             v
//               ?.slice(0, v?.length - 1)
//               ?.trim()
//               ?.replace(/\D/g, "")
//           )
//         )
//       );
//     }
//   };