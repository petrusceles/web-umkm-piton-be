const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());

// API Documentation
app.use(
  cors({
    origin: ["https://web-umkm-piton.vercel.app", "http://localhost:3000"],
  })
);
app.use("/api", routes);
app.listen(process.env.PORT || 3456, () => {
  console.log(`http://localhost:${process.env.PORT || 3456}`);
});

module.exports = app;
