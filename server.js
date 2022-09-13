const express = require("express");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.once("open", () => {
  app.listen(PORT, () => console.log(`API server connected at port ${PORT}`));
});

app.use(require("./routes"));
