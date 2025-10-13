require('dotenv').config({ path: '.env' });


const express = require("express");
const path = require("node:path");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = 3000;
const queries = require("./db/queries");

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
        const breeds = await queries.getAllBreeds();
        res.render("dogs", { dogs, breeds });
    } catch (error) {
        console.error("Error loading dogs:", error);
        res.status(500).send("Error loading data");
    }
});

app.get("/owners", async (req, res) => {
    try {
        const owners = await queries.getAllOwners();
        const dogs = await queries.getAllDogs();
        res.render("owners", { owners, dogs });
    } catch (error) {
        console.error("Error loading owners:", error);
        res.status(500).send("Error loading data");
    }
});

//API request implementation for routes

//Home
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
    const { id, name, description, price, dogId, date } = req.body;
    try {
        await queries.editHaircut(id, name, description, price, dogId, date);
        res.redirect("/"); // Stay on homepage
    } catch (error) {
        console.error("Error editing haircut:", error);
        res.status(500).send("Error editing haircut");
    }
});

//Haircut booking page, with prior bookings below 
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
    const { id, name, description, price, dogId, date } = req.body;
    try {
        await queries.editHaircut(id, name, description, price, dogId, date);
        res.redirect("/");
    } catch (error) {
        console.error("Error editing haircut:", error);
        res.status(500).send("Error editing haircut");
    }
});

app.post("/book", async (req, res) => {
    const { name, description, price, dogId, date } = req.body;
    try {
        await queries.newHaircut(name, description, price, dogId, date);
        res.redirect("/");
    } catch (error) {
        console.error("Error creating haircut:", error);
        res.status(500).send("Error creating haircut");
    }
});

//Edit dogs page, has ability to edit and delete breeds too
app.delete("/dogs", async (req, res) => {
    const { id, type } = req.query;
    try {
        if (type === 'breed') {
            await queries.removeBreed(id);
        } else {
            await queries.removeDog(id);
        }
        res.redirect("/dogs");
    } catch (error) {
        console.error("Error deleting:", error);
        res.status(500).send("Error deleting");
    }
});


app.put("/dogs", async (req, res) => {
    const { id, type, name, breed, preferredStylist, breedName, description } = req.body;
    try {
        if (type === 'breed') {
            await queries.editBreed(id, breedName, description);
        } else {
            await queries.editDog(id, name, breed, preferredStylist);
        }
        res.redirect("/dogs");
    } catch (error) {
        console.error("Error editing:", error);
        res.status(500).send("Error editing");
    }
});

app.post("/dogs", async (req, res) => {
    const { type, name, breed, preferredStylist, breedName, description } = req.body;
    try {
        if (type === 'breed') {
            await queries.newBreed(breedName, description);
        } else {
            await queries.newDog(name, breed, preferredStylist);
        }
        res.redirect("/dogs");
    } catch (error) {
        console.error("Error creating:", error);
        res.status(500).send("Error creating");
    }
});

//Owners page, can edit, delete and post
app.delete("/owners", async (req, res) => {
    const { id } = req.query;
    try {
        await queries.removeOwner(id);
        res.redirect("/owners");
    } catch (error) {
        console.error("Error deleting owner:", error);
        res.status(500).send("Error deleting owner");
    }
});

app.put("/owners", async (req, res) => {        //Webpage does the combination of data
    const { id, name, email, phone, dogId } = req.body;
    try {
        await queries.editOwner(id, name, email, phone, dogId);
        res.redirect("/owners");
    } catch (error) {
        console.error("Error editing owner:", error);
        res.status(500).send("Error editing owner");
    }
});

app.post("/owners", async (req, res) => {
    const { name, email, phone, dogId } = req.body;
    try {
        await queries.newOwner(name, email, phone, dogId);
        res.redirect("/owners");
    } catch (error) {
        console.error("Error creating owner:", error);
        res.status(500).send("Error creating owner");
    }
});


app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`listening on port ${PORT}!`);
});