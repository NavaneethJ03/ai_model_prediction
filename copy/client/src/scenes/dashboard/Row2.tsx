import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetPowerConsumptionGraphDataQuery } from "@/state/api";
import { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ComposedChart,
  Bar,
  Line, Label,
  Legend,
} from "recharts";
import { PowerConsumptionGraphData } from "@/state/types";

const Row2 = () => {
  const { data } = useGetPowerConsumptionGraphDataQuery();
  console.log("data", data);

  const chartData: Array<{
    date: string;
    import_from_the_grid: number;
    schedule_from_the_grid: number;
    shedding: number;
    od_ud: number; // Corrected here
  }> = useMemo(() => {
    if (!Array.isArray(data)) return [];
    
    const transformedData = data.map((item: PowerConsumptionGraphData) => ({
      date: `${item.year}-${item.month.toString().padStart(2, '0')}`,
      import_from_the_grid: item.import_from_the_grid,
      schedule_from_the_grid: item.schedule_from_the_grid,
      shedding: item.demand_med - item.import_from_the_grid, 
      od_ud: item.od_ud, // Corrected here
    }));
    
    return transformedData.sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader title="Power Consumptions" sideText={`${data?.length} records`} />
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            width={500}
            height={900}
            data={chartData}
            margin={{
              top: 30,
              right: 20,
              bottom: 30,
              left: 35,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" scale="band" >
              <Label value="Year-month" offset={-40} position="insideBottom" />{" "}
            </XAxis>
            <YAxis>
              <Label value="Demand (MW)" angle={-90} offset={-20} position="insideLeft" style={{ textAnchor: 'middle' }}  />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar
              dataKey="schedule_from_the_grid"
              barSize={20}
              fill="#413ea0"
              name="Scheduled Power (Planned)"
            />
            <Bar
              dataKey="import_from_the_grid"
              barSize={20}
              fill="#82ca9d"
              name="Power Imported (From Grid)"
            />
            <Line
              type="monotone"
              dataKey="shedding"
              stroke="#ff7300"
              name="Shedding (Power Cut)"
            />
            <Line
              type="monotone"
              dataKey="od_ud" // Corrected here
              stroke="#8884d8"
              name="Overdraw/Underdraw"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
