// Imports
const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const exphbs = require("express-handlebars");

// Variables
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

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
