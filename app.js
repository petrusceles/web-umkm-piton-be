// const express = require("express");
// const app = express();
// const routes = require("./routes");
// const cors = require("cors");
// require("dotenv").config();
// app.use(express.json());

// // API Documentation
// app.use(cors());
// app.use("/api", routes);
// app.listen(process.env.PORT || 3456, () => {
//   console.log(`http://localhost:${process.env.PORT || 3456}`);
// });

// module.exports = app;

const express = require("express");
// const routes = require("./routes");
// const cors = require("cors");
// require("dotenv").config();
// app.use(express.json());

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send(`Hey this is my API PORT ${PORT} running 🥳`);
});

app.get("/about", (req, res) => {
  res.send("This is my about route..... ");
});

// Export the Express API
module.exports = app;
