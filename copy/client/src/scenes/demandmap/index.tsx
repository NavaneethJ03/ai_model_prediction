import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, Paper, Button, Select, MenuItem, InputLabel, FormControl, TextField } from "@mui/material";

// Extended static data for localities and their respective demand
const demandData = [
  { id: 1, name: "Connaught Place", demand: "281.64 MW", position: [28.6297, 77.2295] },
  { id: 2, name: "Dwarka", demand: "563.28 MW", position: [28.5505, 77.0190] },
  { id: 3, name: "Gurgaon", demand: "751.04 MW", position: [28.4595, 77.0266] },
  { id: 4, name: "Noida", demand: "563.28 MW", position: [28.5355, 77.3910] },
  { id: 5, name: "North Delhi", demand: "469.40 MW", position: [28.6880, 77.2240] },
  { id: 6, name: "South Delhi", demand: "657.16 MW", position: [28.5245, 77.2023] },
  { id: 7, name: "East Delhi", demand: "516.34 MW", position: [28.6018, 77.2787] },
  { id: 8, name: "West Delhi", demand: "422.46 MW", position: [28.6165, 77.0800] },
  { id: 9, name: "Faridabad", demand: "234.70 MW", position: [28.4082, 77.3175] },
  { id: 10, name: "Ghaziabad", demand: "234.70 MW", position: [28.6692, 77.4538] },
];

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/fluency/48/000000/marker.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -30],
});

// Custom oval-like polygon coordinates covering Delhi, Greater Noida, and Faridabad
const ovalCoords = [
  [28.7500, 77.0750],
  [28.8500, 77.2000],
  [28.8000, 77.3500],
  [28.6000, 77.3500],
  [28.5000, 77.2000],
  [28.5500, 77.0500],
  [28.6000, 76.9500],
  [28.7500, 76.9500],
];

const DemandMap = () => {
  const [selectedLocality, setSelectedLocality] = useState(demandData[0]);
  const [latitude, setLatitude] = useState(demandData[0].position[0]);
  const [longitude, setLongitude] = useState(demandData[0].position[1]);
  const [region, setRegion] = useState(demandData[0].name);
  const [predictedLoad, setPredictedLoad] = useState(demandData[0].demand);
  const [totalDemand, setTotalDemand] = useState(null);

  const handleSelectChange = (event) => {
    const locality = demandData.find((loc) => loc.name === event.target.value);
    if (locality) {
      setSelectedLocality(locality);
      setLatitude(locality.position[0]);
      setLongitude(locality.position[1]);
      setRegion(locality.name);
      setPredictedLoad(locality.demand || "175 MW");
    }
  };

  // Calculate total demand for localities within the polygon
  const calculateTotalDemand = () => {
    const total = demandData.reduce((acc, loc) => acc + parseInt(loc.demand), 0);
    setTotalDemand(`${total} MW`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#3f3f46",
        color: "#FFFFFF",
        height: "100vh",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(3, 3, 3, 200)", // Added shadow here
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#FFFFFF",
          mb: 2,
          fontSize: "2rem",
          fontFamily: "sans-serif", // Set sans-serif font
        }}
      >
        Delhi Power Load Predictor
      </Typography>

      <Box
        sx={{
          height: "63%",
          mb: 4,
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[latitude, longitude]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {demandData.map((locality) => (
            <Marker key={locality.id} position={locality.position} icon={customIcon}>
              <Popup>
                <strong>{locality.name}</strong>
                <br />
                Demand: {locality.demand}
              </Popup>
            </Marker>
          ))}
          {selectedLocality && (
            <Marker position={selectedLocality.position} icon={customIcon}>
              <Popup>
                <strong>{selectedLocality.name}</strong>
                <br />
                Demand: {selectedLocality.demand}
              </Popup>
            </Marker>
          )}
          <Polygon
            positions={ovalCoords}
            pathOptions={{
              color: "red",
              fillColor: "rgba(255, 0, 0, 0.5)",
              fillOpacity: 0.5,
              weight: 3,
            }}
            eventHandlers={{
              mouseover: calculateTotalDemand,
              mouseout: () => setTotalDemand(null),
            }}
          />
          {totalDemand && (
            <Popup
              position={[28.629686, 77.230282]}
              onClose={() => setTotalDemand(null)}
            >
              <div>Total Demand: {totalDemand}</div>
            </Popup>
          )}
        </MapContainer>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 0, gap: 4 }}>
        <TextField
          label="Latitude"
          variant="outlined"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          sx={{
            input: { color: "#FFFFFF", fontSize: "1.1rem", fontFamily: "sans-serif" }, // Set sans-serif font
            label: { color: "#FFFFFF", fontSize: "1.3rem", fontWeight: "bold", fontFamily: "sans-serif" }, // Larger and bolder label with sans-serif
            width: "220px",
            borderRadius: "12px",
          }}
          InputLabelProps={{ style: { color: "#FFFFFF", fontFamily: "sans-serif" } }} // Sans-serif font for label
        />
        <TextField
          label="Longitude"
          variant="outlined"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          sx={{
            input: { color: "#FFFFFF", fontSize: "1.1rem", fontFamily: "sans-serif" }, // Set sans-serif font
            label: { color: "#FFFFFF", fontSize: "1.3rem", fontWeight: "bold", fontFamily: "sans-serif" }, // Larger and bolder label with sans-serif
            width: "220px",
            borderRadius: "12px",
          }}
          InputLabelProps={{ style: { color: "#FFFFFF", fontFamily: "sans-serif" } }} // Sans-serif font for label
        />
      </Box>

      <FormControl sx={{ mb: 3, width: "220px" }}>
        <InputLabel sx={{ color: "#FFFFFF", fontSize: "1.3rem", fontWeight: "bold", fontFamily: "sans-serif" }}>Region</InputLabel>
        <Select
          value={region}
          onChange={handleSelectChange}
          label="Region"
          sx={{
            color: "#FFFFFF",
            fontSize: "1.1rem", // Increased font size for the dropdown
            fontFamily: "sans-serif", // Set sans-serif font
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
            borderRadius: "12px",
          }}
        >
          {demandData.map((locality) => (
            <MenuItem key={locality.id} value={locality.name}>
              {locality.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={() => console.log("Send Data")}
        sx={{
          backgroundColor: "#4A008A",
          color: "#FFFFFF",
          fontSize: "1.2rem", // Increased font size for button
          fontFamily: "sans-serif", // Set sans-serif font
          padding: "10px 20px",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#370064"
          },
        }}
      >
        Search
      </Button>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#4A008A",
          color: "#FFFFFF",
          mt: 3,
          p: 2,
          fontSize: "1.5rem", // Increased font size for the predicted load
          textAlign: "center",
          borderRadius: "12px", // Rounded corners for the paper
          fontFamily: "sans-serif", // Set sans-serif font
        }}
      >
        <Typography variant="h11" sx={{ fontFamily: "sans-serif" }}>Predicted Load</Typography> {/* Sans-serif font */}
        <Typography sx={{ fontWeight: 'bold', fontFamily: "sans-serif" }}>{predictedLoad}</Typography> {/* Made the predicted load bold and sans-serif */}
      </Paper>
    </Box>
  );
};

export default DemandMap;
