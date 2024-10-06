import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetPowerConsumptionsBasedOnPublicHolidaysQuery } from "@/state/api";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Label } from "recharts";
import { curveCardinal } from 'd3-shape';
import { format } from 'date-fns';
import { PowerConsumptionsBasedOnPublicHolidays } from "@/state/types";

const Row3 = () => {
  const { data } = useGetPowerConsumptionsBasedOnPublicHolidaysQuery();
  const cardinal = curveCardinal.tension(0.2);

  const formattedData = data
    ?.map((item: PowerConsumptionsBasedOnPublicHolidays) => ({
      ...item,
      date: format(new Date(item.date), 'dd MMM yyyy'), 
      year: format(new Date(item.date), 'yyyy'), 
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year)); 

  const uniqueYears = Array.from(new Set(formattedData?.map(item => item.year)));

  const tooltipFormatter = (value: number, _name: string, item: { payload?: PowerConsumptionsBasedOnPublicHolidays }) => {
    if (item.payload) {
      return [value, `Festivals: ${item.payload.festivals}, Date: ${item.payload.date}`];
    }
    return [value, ''];
  };

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Power Consumptions based on Public Holidays"
          sideText={`${data?.length} records`}
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={formattedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 70,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* Show only unique years on the XAxis */}
            <XAxis
              dataKey="year"
              ticks={uniqueYears} // Show unique years in ascending order
            >
                <Label value="Year" offset={-17} position="insideBottom" />{" "}
              </XAxis>

            <YAxis dataKey="unrestricted_demand" >
            <Label value="Demand (MW)" angle={-90} offset={0} position="insideLeft" style={{ textAnchor: 'middle' }}  />
              </YAxis>
            <Tooltip formatter={tooltipFormatter} />
            <Area type={cardinal} dataKey="unrestricted_demand" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row3;
