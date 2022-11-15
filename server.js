// Imports
const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");

// Variables
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(routes);

// Sync DB & Listen Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`\nServer live at http://localhost:${PORT}`)
  );
});
