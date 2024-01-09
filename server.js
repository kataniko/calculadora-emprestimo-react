// Express yourself, baby!
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Body-parser: Because we can't digest raw JSON
app.use(bodyParser.json());

// CORS: Making friends across different origins
app.use(cors());

// Root endpoint: The entryway to our digital kingdom
app.get("/", (req, res) => {
  res.send("Hey there, I'm the Node.js server, and I'm up and running!");
});

// Calculate endpoint: Where the magic happens
app.post("/calculate", (req, res) => {
  const { principal, interestRate, loanTerm } = req.body;

  const monthlyPayment = calculateMonthlyPayment(
    principal,
    interestRate,
    loanTerm
  );

  // Total payment: Because we like big numbers
  const totalPayment = (monthlyPayment * loanTerm).toFixed(0);

  // Total interest: The price we pay for borrowing
  const totalInterest = (totalPayment - principal)
    .toFixed(0)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Sending back the financial enlightenment
  res.json({ principal, monthlyPayment, totalPayment, totalInterest });
});

// Financial formula: Like grandma's secret recipe but for money
function calculateMonthlyPayment(principal, interestRate, loanTerm) {
  const r = interestRate / 100 / 12;
  const n = loanTerm;

 
  const monthlyPayment = (principal * r) / (1 - Math.pow(1 + r, -n));

  
  return monthlyPayment.toFixed(2);
}

// Let the server dance!
app.listen(PORT, () => {
  console.log(`Server is busting moves on http://localhost:${PORT}`);
});
