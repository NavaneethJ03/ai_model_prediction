import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Predictions = () => {
  const { palette } = useTheme();
  const [isDemandPredictions, setIsDemandPredictions] = useState(true);
  const [is15DaysPredictions, setIs15DaysPredictions] = useState(false);
  const [demandData, setDemandData] = useState<any[]>([]);
  const [_15DayDemandData, set_15DayDemandData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading15Days, setLoading15Days] = useState(true);
  const [error, setError] = useState("");
  const [selectedPrediction, setSelectedPrediction] = useState<any[]>([]);
  useEffect(() => {
    const fetchDemandData = async () => {
      try {
        const response = await axios.get("https://ai-electroforecast-backend-flask.onrender.com/predict/24hours");
        const data = response.data;
        console.log("Fetched hourly data:", data);
        const formattedData = data.datetime.map((datetime: string, index: number) => ({
          datetime,
          demand: data.predictions[index],
        }));
        setDemandData(formattedData);
        setSelectedPrediction(formattedData); // Set initial state to hourly data
        setLoading(false);
      } catch (error) {
        setError("Error fetching 24 hours prediction data: " + error);
        setLoading(false);
      }
    };

    fetchDemandData();
  }, []);

  useEffect(() => {
    const fetch15DaysDemandData = async () => {
      try {
        const response = await axios.get("https://ai-electroforecast-backend-flask.onrender.com/predict/15days");
        const data = response.data;
        console.log("Fetched 15-day demand data:", data);
        const formattedData = data.datetime.map((datetime: string, index: number) => ({
          datetime,
          demand: data.predictions[index],
        }));
        set_15DayDemandData(formattedData);
        setLoading15Days(false);
      } catch (error) {
        setError("Error fetching 15 days prediction data: " + error);
        setLoading(false);
      }
    };

    fetch15DaysDemandData();
  }, []);

  // Loading screen for both hourly and 15-day data
  if (loading || loading15Days) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", 
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <div className="loader"></div>
        <Typography
          variant="h4"
          fontSize="16px"
          sx={{ marginTop: "1rem" }}
        >
          Fetching Predictions...
        </Typography>
        <Typography
          variant="h4"
          fontSize="16px"
          sx={{ marginTop: "1rem" }}
        >
          Analyzing weather patterns and electricity usage trends. Please wait.
        </Typography>

        {/* Add the keyframes for animation */}
        <style>{`
          .loader {
            width: 48px;
            height: 48px;
            background: #353535;
            display: block;
            margin: 20px auto;
            position: relative;
            box-sizing: border-box;
            animation: rotationBack 1s ease-in-out infinite reverse;
          }

          .loader::before {
            content: '';
            box-sizing: border-box;
            left: 0;
            top: 0;
            transform: rotate(45deg);
            position: absolute;
            width: 48px;
            height: 48px;
            background: #2e2e2e;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
          }

          .loader::after {
            content: '';
            box-sizing: border-box;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            background: rgb(0, 0, 0);
            transform: translate(-50%, -50%);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
          }

          @keyframes rotationBack {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(-360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) return <Typography>{error}</Typography>;

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Demand Prediction</Typography>
          <Typography variant="h6">
            Predicted electricity demand based on weather data
          </Typography>
        </Box>
        <FlexBetween m="1rem 2.5rem" gap="15px">
          <Button
            onClick={() => {
              setIsDemandPredictions(true);
              setIs15DaysPredictions(false);
              setSelectedPrediction(demandData);
            }}
            sx={{
              color: palette.grey[900],
              backgroundColor: palette.grey[700],
              boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
            }}
          >
            Show hourly demand Predictions
          </Button>
          <Button
            onClick={() => {
              setIsDemandPredictions(false);
              setIs15DaysPredictions(true);
              setSelectedPrediction(_15DayDemandData);
            }}
            sx={{
              color: palette.grey[900],
              backgroundColor: palette.grey[700],
              boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
            }}
          >
            Show 15 days demand Predictions
          </Button>
        </FlexBetween>
      </FlexBetween>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={selectedPrediction}
          margin={{ top: 10, right: 75, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="datetime" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="DateTime" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `${v} MW`}
          >
            <Label
              value="Demand (MW)"
              angle={-90}
              offset={-15}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          {isDemandPredictions && (
            <Line
              type="monotone"
              dataKey="demand"
              stroke={palette.tertiary[500]}
              dot={false}
              strokeDasharray="5 5"
            />
          )}
          {is15DaysPredictions && (
            <Line
              type="monotone"
              dataKey="demand"
              stroke={palette.secondary[500]}
              dot={false}
              strokeDasharray="5 5"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
