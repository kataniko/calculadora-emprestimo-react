import React, { useState, useEffect } from "react";
import { Typography, Slider, Box, Grid, TextField, Input } from "@mui/material";
import axios from "axios";
import "./styles.css";
import marks from "./utils/Marks";
import MyChart from "./MyChart";
import styled from "styled-components";

//For this project i used MaterialUI , once i can get advantages . I always enjoyed my time using it
// but i have to admit that i still love more tailwind ;)
//creating custom components is still a bit more messy than using tailwind in my opinion , but once is a smaller project its okayyy
//In the app there are still problems to fix. I would like to format better the data and there is a bug in the last TextField.
//Typing for exameple 180 months for the first time the app is launched makes it bugs for somereason, but then moving the sliders it unbugs and makes it right.
//(this is me from after fixing this bug, just wanted to say i fixed it using useEffect with a dependency of LoanTerm).
//In the email there wasnt mobile responsive task but i used Grid because its always a great tactic to make it responsive(the chart is not ready for it) .
//It was my first try on Node.js as well with express for the API.
//I hope is not thaaaat baaaad ;)

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const handleAmountChange = async (event, newValue) => {
    setPrincipal(newValue);

    // Make API request when loan amount changes
    await handleCalculate();
  };

  const handleInterestChange = async (event, newValue) => {
    setInterestRate(newValue);

    // Make API request when interest rate changes
    await handleCalculate();
  };

  const handleLoanTermChange = (e) => {
    // Set the loan term using the provided setter function
    setLoanTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Make API request when interest rate changes
      await handleCalculate();
    };

    // Check if all required values are present
    if (principal !== "" && interestRate !== "" && loanTerm !== "") {
      fetchData();
    }
  }, [loanTerm]);

  //styled component i made to not repeat unecessary code
  const StyledTextField = styled(TextField)`
    && {
      margin-top: 2px; // Adjust top margin
      font-family: "Nunito";
      font-size: 30px;
      & input {
        color: white; // Change text color
        font-family: "Nunito";
      }
      & label {
        color: orange; // Change label color
        font-family: "Nunito";
      }
      & .MuiFilledInput-underline::before,
      & .MuiFilledInput-underline::after {
        border-bottom-color: orange; // Change the underline color
      }
      & .MuiFilledInput-root {
        background-color: transparent; // Change the filled input background color
      }
      & .MuiFilledInput-underline {
        border-bottom-color: transparent; // Change the underline color
      }
    }
  `;

  //get data from api
  const handleCalculate = async () => {
    try {
      // Check if all required values are present
      if (principal !== "" && interestRate !== "" && loanTerm !== "") {
        const response = await axios.post("http://localhost:3001/calculate", {
          principal,
          interestRate,
          loanTerm,
        });

        setMonthlyPayment(response.data.monthlyPayment);
        setTotalPayment(response.data.totalPayment);
        setTotalInterest(response.data.totalInterest);
      }
    } catch (error) {
      console.error("Error calculating loan:", error);
    }
  };

  //format the marks
  function valuetext(value) {
    return `${value}K`;
  }

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 30,
          width: "100vw",
          textAlign: "center",
          padding: "5px 0px",
          backgroundColor: "#27304C",
          color: "white",
          fontFamily: "Nunito",
        }}
      >
        LOAN CALCULATOR
      </Typography>
      <Grid sx={{ p: 2 }} container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 5,
              backgroundColor: "#27304C",
              height: "50vh",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "2px 2px 10px black",
              border: 1,
              borderColor: "transparent",
              borderRadius: "1%",
            }}
          >
            <div>
              <div className="flex">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: 30,
                    width: "200px",
                    fontFamily: "Nunito",
                  }}
                  id="loan-amount-slider"
                  gutterBottom
                >
                  Loan Amount
                </Typography>

                <StyledTextField
                  id="filled-number"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  value={principal} // Add this line to connect with state
                  onChange={(e) => handleAmountChange(e, e.target.value)} // Pass the event and value to the function
                />
              </div>
              <Slider
                onChange={handleAmountChange}
                aria-label="Custom marks"
                getAriaValueText={valuetext}
                step={100000}
                valueLabelDisplay="auto"
                marks={marks.map((mark) => ({
                  ...mark,
                  label: (
                    <div
                      key={mark.value}
                      style={{
                        color: "white", // Change the color of the custom mark
                        fontFamily: "Nunito",
                        fontSize: 15,
                      }}
                    >
                      {mark.label}
                    </div>
                  ),
                }))}
                min={0}
                max={500000}
                value={principal} // Add this line to connect with state
                sx={{
                  color: "primary.main", // Change the color of the track
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#3d6eff", // Change the color of the thumb
                    border: "4px solid #fff", // Add a border to the thumb
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0.16)", // Add a hover or focus effect
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.5, // Change the opacity of the rail
                  },
                  "& .MuiSlider-mark": {
                    backgroundColor: "white",
                    color: "white", // Change the color of the marks
                  },
                  height: "10px",
                }}
              />
            </div>
            <br />

            <div>
              <div className="flex">
                <Typography
                  sx={{ color: "white", fontSize: 25, fontFamily: "Nunito" }}
                  id="interest-rate-slider"
                  gutterBottom
                >
                  Interest Rate
                </Typography>
                <StyledTextField
                  id="filled-number"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  value={interestRate} // Add this line to connect with state
                  onChange={(e) => handleInterestChange(e, e.target.value)} // Pass the event and value to the function
                />
              </div>
              <Slider
                value={interestRate}
                onChange={handleInterestChange}
                valueLabelDisplay="auto"
                aria-labelledby="interest-rate-slider"
                min={0}
                max={10}
                sx={{
                  color: "primary.main", // Change the color of the track
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#3d6eff", // Change the color of the thumb
                    border: "4px solid #fff", // Add a border to the thumb
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0.16)", // Add a hover or focus effect
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.5, // Change the opacity of the rail
                  },
                  "& .MuiSlider-mark": {
                    backgroundColor: "white",
                    color: "white", // Change the color of the marks
                  },
                  height: "10px",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Nunito",
                  fontSize: 20,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
                variant="body2"
                color="textSecondary"
              >
                Actual Rate
                <Typography sx={{ color: "orange", fontSize: 20, ml: 2 }}>
                  {interestRate}%
                </Typography>
              </Typography>
            </div>

            <br />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "Nunito",
                  mr: 2,
                }}
              >
                Loan Term (Months)
              </Typography>

              <Input
                value={loanTerm}
                onChange={handleLoanTermChange}
                placeholder="Placeholder"
              />
            </Box>

            <br />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#27304C",
              p: 5,
              boxShadow: "2px 2px 10px black",
              border: 1,
              borderColor: "transparent",
              borderRadius: "1%",
            }}
          >
            <Typography
              sx={{ color: "white", fontSize: 30, fontFamily: "Nunito" }}
            >
              Breakup of total payment
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <MyChart
                totalInterest={totalInterest}
                monthlyPayment={monthlyPayment}
                totalPayment={totalPayment}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanCalculator;
