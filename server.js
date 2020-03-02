const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const cartRoutes = require("./routes.js");
app.use("/", cartRoutes);
const port = 6969;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
