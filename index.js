import express from "express";
import cors from "cors";

import "dotenv/config";

import routes from "./src/routes/index.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
