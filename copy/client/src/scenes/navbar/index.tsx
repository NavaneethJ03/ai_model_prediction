import { useState, useEffect } from "react"; 
import { Link, useLocation } from "react-router-dom";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

const Navbar = () => {
  const { palette } = useTheme();
  const location = useLocation();
  const [selected, setSelected] = useState("");

  // Sync state with the current route on mount or route change
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setSelected("predictions");
    } else if (currentPath === "/dashboard") {
      setSelected("dashboard");
    } else if (currentPath === "/demandmap") {
      setSelected("demandmap");
    } else if (currentPath === "/chatbot") {
      setSelected("chatbot");
    } else if (currentPath === "/gridschedule") { // New route for grid schedule
      setSelected("gridschedule");
    } else if (currentPath === "/aboutus") {
      setSelected("aboutus");
    }
  }, [location.pathname]);

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <FlashOnIcon sx={{ fontSize: "32px" }} /> {/* Increased icon size */}
        <Typography variant="h4" fontSize="20px"> {/* Increased title font size */}
          ElectroForecast
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
              fontSize: "18px", // Increased font size
            }}
          >
            Predictions
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/dashboard"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
              fontSize: "18px", // Increased font size
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/demandmap"
            onClick={() => setSelected("demandmap")}
            style={{
              color: selected === "demandmap" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
              fontSize: "18px", // Increased font size
            }}
          >
            Demand Map
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/chatbot"
            onClick={() => setSelected("chatbot")}
            style={{
              color: selected === "chatbot" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
              fontSize: "18px", // Increased font size
            }}
          >
            Chatbot
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/gridschedule" // New link for grid schedule
            onClick={() => setSelected("gridschedule")}
            style={{
              color: selected === "gridschedule" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
              fontSize: "18px", // Increased font size
            }}
          >
            Grid Schedule
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/aboutus"
            onClick={() => setSelected("aboutus")}
            style={{
              color: selected === "aboutus" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
              fontSize: "18px", // Increased font size
            }}
          >
            About Us
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;


