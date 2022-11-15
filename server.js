// Imports
const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");

// Variables
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Sync DB & Listen Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`\nServer live at http://localhost:${PORT}`)
  );
});
