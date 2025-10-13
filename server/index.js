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
app.get("/", (req, res) => {
    res.render("index", { haircuts });
});

app.get("/book", (req, res) => {
    res.render("new-haircut", { dogs, stylists });  //Will need custom SQL call
});

app.get("/dogs", (req, res) => {
    res.render("index", { dogs });
});

app.get("/owners", (req, res) => {
    res.render("index", { dogs });
});

//API request implementation for routes
app.delete("/", async (req, res) => {
    const { id } = req.query;
    try {
        await queries.removeHaircut(haircutId);
        res.redirect("/"); // Stay on homepage
    } catch (error) {
        console.error("Error deleting haircut:", error);
        res.status(500).send("Error deleting haircut");
    }
});

app.delete("/book", async (req, res) => {
    const { id } = req.query;
    try {
        await queries.removeHaircut(haircutId);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting haircut:", error);
        res.status(500).send("Error deleting haircut");
    }
});

app.post("/book", async (req, res) => {
    const { id } = req.query;
    try {
        await queries.newHaircut(haircutId);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting haircut:", error);
        res.status(500).send("Error deleting haircut");
    }
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`listening on port ${PORT}!`);
});