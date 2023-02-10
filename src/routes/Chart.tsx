import { useQuery } from "@tanstack/react-query";
import ApexCharts from "react-apexcharts";
import { fetchCoinHistory } from "../api";
interface CharProps {
  coinId: string;
}

interface iHistorical {
  close: string;
  high: string;
  low: string;
  open: string;
  volume: string;
  market_cap: number;
  time_close: number;
  time_open: number;
}

function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<iHistorical[]>({
    queryKey: ["ohlc", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 10000,
  });
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => Number.parseInt(price.close)) || [],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: { curve: "smooth", width: 3 },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              categories: data?.map((price) => price.time_close) || [],
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        ></ApexCharts>
      )}
    </>
  );
}
export default Chart;
