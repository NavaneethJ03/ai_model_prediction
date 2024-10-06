import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetPowerFurtherRequiredFromSolarEnergyQuery } from "@/state/api";
import { PowerFurtherRequiredFromSolarEnergy } from "@/state/types";
import { useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  TooltipProps,
  CartesianGrid,
  Label,
} from "recharts";
import { format } from "date-fns";

const Row4 = () => {
  const { palette } = useTheme();
  const { data: powerFurtherRequiredData } =
    useGetPowerFurtherRequiredFromSolarEnergyQuery();

  // Ensure data is properly fetched and transformed
  const solarEnergyChartData = Array.isArray(powerFurtherRequiredData)
    ? powerFurtherRequiredData.map(
        (item: PowerFurtherRequiredFromSolarEnergy) => ({
          month: item.month,
          "od-ud": item["od-ud"],
          date: format(new Date(item.date), "dd MMM yyyy"),
        })
      )
    : [];

  // Sort data by month in ascending order
  const sortedChartData = solarEnergyChartData.sort(
    (a, b) => a.month - b.month
  );

  console.log("Fetched Data:", powerFurtherRequiredData);
  console.log("Mapped and Sorted Chart Data:", sortedChartData);

  const uniqueMonths = Array.from(
    new Set(sortedChartData.map((item) => item.month))
  );
  console.log("Unique Months:", uniqueMonths);

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      const { date, "od-ud": odUd } = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>{`Date: ${date}`}</p>
          <p>{`Overdraw/Underdraw: ${odUd}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Solar Energy Area Chart */}
      <DashboardBox gridArea="e">
        <BoxHeader
          title="Power Further Required from Solar Energy"
          subtitle="Graph representing overdraw/underdraw across months"
          sideText={`${powerFurtherRequiredData?.length || 0} records`}
        />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={sortedChartData}
            margin={{ top: 10, right: 20, left: 15, bottom: 40 }}
          >
            <defs>
              <linearGradient
                id="colorPowerFurther"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              ticks={uniqueMonths}
              style={{ fontSize: "10px" }}
            >
              <Label value="Month" offset={-17} position="insideBottom" />{" "}
              </XAxis>
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: 0 }}
              style={{ fontSize: "10px" }}
              domain={["auto", "auto"]}
            >
              <Label
                value="Demand (MW)"
                angle={-90}
                offset={0}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="od-ud"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorPowerFurther)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row4;