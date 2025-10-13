const express = require("express");
const path = require("node:path");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = 3000;
const queries = require("../db/queries");

// Middleware 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded (from HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// Routes - Fix to load data from database
app.get("/", async (req, res) => {
    try {
        const haircuts = await queries.getAllHaircuts();
        const dogs = await queries.getAllDogs();
        const stylists = await queries.getAllStylists();
        res.render("index", { haircuts, dogs, stylists });
    } catch (error) {
        console.error("Error loading homepage:", error);
        res.status(500).send("Error loading data");
    }
});

app.get("/book", async (req, res) => {
    try {
        const haircuts = await queries.getAllHaircuts();
        const dogs = await queries.getAllDogs();
        const stylists = await queries.getAllStylists();
        res.render("new-haircut", { haircuts, dogs, stylists });
    } catch (error) {
        console.error("Error loading booking page:", error);
        res.status(500).send("Error loading data");
    }
});

app.get("/dogs", async (req, res) => {
    try {
        const dogs = await queries.getAllDogs();
        res.render("index", { dogs });
    } catch (error) {
        console.error("Error loading dogs:", error);
        res.status(500).send("Error loading data");
    }
});

app.get("/owners", async (req, res) => {
    try {
        const dogs = await queries.getAllDogs();
        res.render("index", { dogs });
    } catch (error) {
        console.error("Error loading owners:", error);
        res.status(500).send("Error loading data");
    }
});

//API request implementation for routes
app.delete("/", async (req, res) => {
    const { id } = req.query;
    try {
        await queries.removeHaircut(id);
        res.redirect("/"); // Stay on homepage
    } catch (error) {
        console.error("Error deleting haircut:", error);
        res.status(500).send("Error deleting haircut");
    }
});

app.put("/", async (req, res) => {
    const { id, name, description, price, dogId, date } = req.body; // Changed from req.query
    try {
        await queries.editHaircut(id, name, description, price, dogId, date);
        res.redirect("/"); // Stay on homepage
    } catch (error) {
        console.error("Error editing haircut:", error);
        res.status(500).send("Error editing haircut");
    }
});

app.delete("/book", async (req, res) => {
    const { id } = req.query;
    try {
        await queries.removeHaircut(id);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting haircut:", error);
        res.status(500).send("Error deleting haircut");
    }
});

app.put("/book", async (req, res) => {
    const { id, name, description, price, dogId, date } = req.body; // Changed from req.query
    try {
        await queries.editHaircut(id, name, description, price, dogId, date);
        res.redirect("/");
    } catch (error) {
        console.error("Error editing haircut:", error);
        res.status(500).send("Error editing haircut");
    }
});

app.post("/book", async (req, res) => {
    const { name, description, price, dogId, date } = req.body; // Changed from req.query
    try {
        await queries.newHaircut(name, description, price, dogId, date);
        res.redirect("/");
    } catch (error) {
        console.error("Error creating haircut:", error);
        res.status(500).send("Error creating haircut");
    }
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`listening on port ${PORT}!`);
});