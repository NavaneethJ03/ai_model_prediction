import { Box, useMediaQuery, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Row4 from "./Row4";

const gridTemplateLargeScreens = `
  "a b c "
  "a b c "
  "a b c"
  "a b c"
  "a b c"
  "d d d"
  "d d d"
  "d d d"
  "d d d"
  "d d d"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "g g g"
  "e e e "
  "e e e "
  "e e e "
  "e e e "
  "e e e "
  "e e e "
  "e e e "
  "e e e "
  "e e e "
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "d"
  "g"
  "g"
  "g"
  "e"
  "e"
  "e"
  "e"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch delay
    const fetchData = async () => {
      // Perform actual data fetching here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay of 2 seconds
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <div className="loader"></div>
        <Typography
          variant="h4"
          fontSize="16px"
          sx={{ marginTop: "1rem"}}
        >
          Fetching Last 16 Years Data
        </Typography>
        <Typography variant="h4"
          fontSize="16px" sx={{marginTop: "1rem" }}>
          Preparing data insights to help you make better energy decisions.
        </Typography>

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
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(12, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
    </Box>
  );
};

export default Dashboard;
