import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetMaxDemandOfEveryYearQuery } from "@/state/api";
import {
  useGetPowerConsumptionsBasedOnWeatherDataQuery,
  useGetInfrastructureDataQuery,
} from "@/state/api";
import {
  MaxDemandOfEveryYear,
  PowerConsumptionsBasedOnWeatherData,
  InfrastructureData,
} from "@/state/types";
import { useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  PieChart,
  Pie,
  Sector,
  Label,
} from "recharts";
import React, { useState } from "react";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.season}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#999"
      >{`Demand ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Row1 = () => {
  const { palette } = useTheme();
  const { data: maxDemandData } = useGetMaxDemandOfEveryYearQuery();
  const { data: powerConsumptionData } =
    useGetPowerConsumptionsBasedOnWeatherDataQuery();
  console.log("data", maxDemandData);
  const { data: infrastructureData } = useGetInfrastructureDataQuery();
  console.log("Infrastructure Data", infrastructureData);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(2023);

  // Prepare chart data for Max Demand of Every Year
  const chartData: Array<{ name: number; demand: number }> = Array.isArray(
    maxDemandData
  )
    ? maxDemandData
        .map((item: MaxDemandOfEveryYear) => ({
          name: item.year,
          demand: item.unrestricted_demand,
        }))
        // Sort chartData by year (ascending order)
        .sort((a, b) => a.name - b.name)
    : [];

  // Prepare data for Power Consumption Chart
  const filteredData = (
    powerConsumptionData as PowerConsumptionsBasedOnWeatherData[]
  )?.filter(
    (d) =>
      d.year === selectedYear &&
      ["Fall", "Spring", "Winter", "Summer"].includes(d.season)
  );

  const uniqueYears = Array.from(
    new Set(
      (powerConsumptionData as PowerConsumptionsBasedOnWeatherData[])?.map(
        (d) => d.year
      )
    )
  ).sort((a, b) => a - b); // Sort the years in ascending order

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Prepare infrastructure data for the bar chart
  const infrastructureChartData: Array<{
    name: string;
    Domestic: number;
    Commercial: number;
    Industrial: number;
    Street_Lighting: number;
  }> = Array.isArray(infrastructureData)
    ? infrastructureData.map((item: InfrastructureData) => ({
        name: item.Year, // Year as the name for the X-axis
        Domestic: item.Domestic,
        Commercial: item.Commercial,
        Industrial: item.Industrial,
        Street_Lighting: item.Street_Lighting,
      }))
    : [];

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Max Demand Of Every Year From Last 16 Years:"
          subtitle="Top line represents demand"
          sideText={`${Array.isArray(maxDemandData) ? maxDemandData.length : 0} records`}
                  />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 15, right: 25, left: 20, bottom: 80 }} // Increased bottom margin
          >
            <defs>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
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
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label value="Year" offset={-10} position="insideBottom" />{" "}
              {/* Adjusted offset */}
            </XAxis>

            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: 0 }}
              style={{ fontSize: "10px" }}
              domain={["auto", "auto"]}
            >
              <Label value="Demand (MW)" angle={-90} offset={-5} position="insideLeft" style={{ textAnchor: 'middle' }} />
              </YAxis>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="demand"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorDemand)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Power Consumption Chart */}
      <DashboardBox
        gridArea="b"
        sx={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BoxHeader
          title="Power Consumption by Season"
          subtitle="Seasonal power demand"
          sideText={`${Array.isArray(maxDemandData) ? maxDemandData.length : 0} records`}
        />

        {/* Center the select option */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "15px",
          }}
        >
          <select
            onChange={handleYearChange}
            value={selectedYear ?? "2023"}
            style={{
              padding: "10px 16px",
              fontSize: "14px",
              backgroundColor: "#111827", // bg-gray-900 equivalent (dark gray)
              color: "#fff", // White text for contrast
              borderRadius: "8px",
              border: "1px solid #4b5563", // Slightly lighter gray border
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Add a subtle shadow for depth
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              fontFamily: "'Roboto', sans-serif", // Modern font
              cursor: "pointer", // Pointer cursor on hover
            }}
          >
            <option value="">Select a year</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Center the chart */}
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={filteredData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="unrestricted_demand"
                nameKey="season"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </DashboardBox>

      {/* Infrastructure Data Chart */}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Infrastructure Data by Year"
          subtitle="Domestic, Commercial, Industrial, and Street Lighting"
          sideText={`${infrastructureData?.length} records`}
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={infrastructureChartData}
            margin={{ top: 17, right: 15, left: 20, bottom: 80 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            >
                <Label value="Year-month" offset={-10} position="insideBottom" />{" "}
              </XAxis>
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            >
              <Label value="Demand (MW)" angle={-90} offset={-5} position="insideLeft" style={{ textAnchor: 'middle' }} />
              </YAxis>
            <Tooltip />
            <Bar dataKey="Domestic" fill={palette.primary.main} />
            <Bar dataKey="Commercial" fill={palette.secondary.main} />
            <Bar dataKey="Industrial" fill={palette.error.main} />
            <Bar dataKey="Street_Lighting" fill={palette.warning.main} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
