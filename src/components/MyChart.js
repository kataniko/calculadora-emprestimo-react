import { useEffect } from "react";
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";
import "./styles.css";

const MyChart = ({ monthlyPayment, totalPayment, totalInterest }) => {
  return (
    <div className="section-chart">
      <PieChart
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 20,
              fill: "white",
              fontFamily: "Nunito",
              padding:10,
              textAlign:"center",
            
            },
          
          },
        }}
        series={[
          {
            data: [
              {
                id: 0,
                value: totalInterest,
                label: `Total Interest: ${totalInterest}$`,
                color: "#EC7736",
              },
              {
                id: 1,
                value: totalPayment,
                label: `Principal Amount: ${totalPayment}$`,
              },
            ],
            innerRadius: 200,
            outerRadius: 100,
            paddingAngle: -2,
            cornerRadius: 4,
            startAngle: -180,
            endAngle: 180,
            cx: 220,
            cy: 220,
          },
        ]}
        width={800}
        height={500}
      />

      <div className="results-section">
        {monthlyPayment !== null && totalPayment !== null && (
          <div>
            <Typography
              sx={{
                color: "white",
                fontSize: 40,
                width: "100%",
                textAlign: "center",
                fontFamily: "Nunito",
              }}
            >
              Monthly Payment
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: 30,
                width: "100%",
                textAlign: "center",
              }}
            >
              {monthlyPayment}$
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChart;
