import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const PieOption = {
    data: {
      datasets: [
        {
          data: data?.map((policy) => policy?.total),
          backgroundColor: ["#10B981", "#3B82F6", "#F97316", "#0EA5E9"],
          label: "policy",
        },
      ],
      labels: data?.map((policy) => policy?._id || "Chưa phân loại"),
    },
    options: {
      responsive: true,
    },
    // legend: {
    //   display: false,
    // },
  };

  return (
    <div className="h-full">
      {!data?.length ? (
        <div className="h-full flex justify-center items-center">Chưa có dữ liệu</div>
      ) : (
        <>
          <Pie {...PieOption} className="chart" />
        </>
      )}
    </div>
  );
};

export default PieChart;
