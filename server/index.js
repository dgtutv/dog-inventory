const express = require("express");
const path = require("node:path");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = 3000;

// Middleware 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded (from HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// Routes
app.use("/", userRoutes);

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`listening on port ${PORT}!`);
});