import React, { useState } from 'react';

// Define grid capacities (in MW)
const grids = [
  { name: "Northern Grid", capacity: 12000 },
  { name: "Delhi Transco Limited (DTL)", capacity: 3000 },
  { name: "Bawana Power Plant", capacity: 1500 },
  { name: "Rajghat Power House", capacity: 135 },
  { name: "Okhla Power Plant", capacity: 150 },
];

// Fixed renewable energy available (in MW)
const renewableEnergyAvailable = 500;

const GridSchedule: React.FC = () => {
  const [powerDemand, setPowerDemand] = useState<number>(0);
  const [allocation, setAllocation] = useState<any[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [shortageSuggestions, setShortageSuggestions] = useState<string[]>([]);

  // Handle input change for power demand
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPowerDemand(parseInt(e.target.value) || 0);
  };

  // Distribute power based on capacity
  const distributePower = () => {
    const remainingPower = powerDemand - renewableEnergyAvailable; // Subtract renewable energy from total demand
    const totalGridCapacity = grids.reduce((total, grid) => total + grid.capacity, 0); // Calculate total grid capacity
    const newAllocation: any[] = [];

    // Check if remaining demand exceeds total grid capacity
    if (remainingPower > totalGridCapacity) {
      const excessDemand = remainingPower - totalGridCapacity;
      setWarning(`Demand exceeds grid capacities by ${excessDemand.toFixed(2)} MW. Power outages may occur.`);

      // Populate shortage suggestions
      setShortageSuggestions([
        "Purchase electricity from neighboring states or regions.",
        "Increase the use of renewable energy sources such as wind or solar.",
        "Implement demand-side management techniques to reduce peak demand.",
        "Use energy storage systems to mitigate demand spikes.",
        "Encourage users to shift usage to off-peak times."
      ]);

      grids.forEach(grid => {
        // Allocate max capacity since the demand is too high
        newAllocation.push({ grid: grid.name, allocation: grid.capacity.toFixed(2) });
      });
    } else {
      // Distribute the remaining power across grids based on their capacity
      let remainingToAllocate = remainingPower;
      grids.forEach(grid => {
        let gridAllocation = Math.min(
          (grid.capacity / totalGridCapacity) * remainingPower,
          grid.capacity
        );
        newAllocation.push({ grid: grid.name, allocation: gridAllocation.toFixed(2) });
        remainingToAllocate -= gridAllocation;
      });
      setWarning(null); // No warning as all demand is met
      setShortageSuggestions([]); // Clear suggestions since there's no shortage
    }

    setAllocation(newAllocation);
  };

  // Steps to increase renewable energy
  const renewableEnergySteps = () => (
    <ul>
      <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Invest in large-scale solar power plants.</li>
      <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Increase rooftop solar installations across residential and commercial buildings.</li>
      <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Encourage the use of wind and hydroelectric power in nearby regions.</li>
      <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Implement energy storage systems like batteries for renewable energy.</li>
      <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Incentivize energy efficiency programs to reduce overall demand.</li>
    </ul>
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#2d2d34", borderRadius: "10px",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)" }}>
      <h1 style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "24px" }}>Power Distribution Management System</h1>

      <label htmlFor="powerDemand" style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Enter Power Demand (in MW):</label>
      <input
        id="powerDemand"
        type="number"
        value={powerDemand}
        onChange={handleInputChange}
        style={{ margin: "0 10px", padding: "5px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "18px" }}
      />
      <button onClick={distributePower} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", fontFamily: "sans-serif", fontSize: "18px" }}>
        Distribute Power
      </button>

      <h2 style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "21px" }}>Power Allocation</h2>
      {allocation.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Grid Station</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Power Allocated (MW)</th>
            </tr>
          </thead>
          <tbody>
            {allocation.map((alloc, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ddd", padding: "8px", color: "#e0e0e0", fontSize: "18px" }}>{alloc.grid}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", color: "#e0e0e0", fontSize: "18px" }}>{alloc.allocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}><strong>Renewable Energy Available:</strong> {renewableEnergyAvailable} MW</p>

      {warning && (
        <div style={{ color: "red", marginTop: "20px", fontSize: "18px" }}>
          <strong>{warning}</strong>
        </div>
      )}

      {shortageSuggestions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "21px" }}>Suggestions to Meet Demand During Power Shortage</h3>
          <ul>
            {shortageSuggestions.map((suggestion, index) => (
              <li key={index} style={{ color: "#e0e0e0", fontSize: "18px" }}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <h2 style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "21px" }}>Steps to Increase Renewable Energy</h2>
      {renewableEnergySteps()}

      {warning && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "21px" }}>Precautions for Power Shortages</h3>
          <ul>
            <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Reduce non-essential electricity usage during peak hours.</li>
            <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Use energy-efficient appliances to minimize wastage.</li>
            <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Schedule power cuts during low-demand hours to manage grid load.</li>
            <li style={{ color: "#e0e0e0", fontFamily: "sans-serif", fontSize: "18px" }}>Promote community-based solar installations to meet local demand.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default GridSchedule;
