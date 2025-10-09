const pool = require("./pool");

//GET: getAll, getID
//PUT: editID
//POST: writeID
//DELETE: removeID

//dog table
async function getAllDogs() {
    const { rows } = await pool.query("SELECT * FROM dog");
    return rows;
}

async function getDog(id) {
    const { rows } = await pool.query("SELECT * FROM dog WHERE id=($1)", [id]);
    return rows[0];     //Only first row, should only be one dog of certain id
}

async function editDog(id, breed, preferredStylist) {
    const result = await pool.query("UPDATE dog SET breed=($1), preferredStylist=($2) WHERE id=($3)", [breed, preferredStylist, id]);
    return result.rowCount;     //Returns number of rows affected
}

async function removeDog(id) {
    const result = await pool.query("DELETE FROM dog WHERE id=($1)", [id]);
    return result.rowCount;
}

async function newDog(breed, preferredStylist) {
    const { rows } = await pool.query("INSERT INTO dog (breed, preferredStylist) VALUES ($1, $2) RETURNING *", [breed, preferredStylist]);
    return rows[0]; // Returns the newly created dog with auto-generated ID
}

//breed table
async function getAllBreeds() {
    const { rows } = await pool.query("SELECT * FROM breed");
    return rows;
}

async function getBreed(id) {
    const { rows } = await pool.query("SELECT * FROM breed WHERE id=($1)", [id]);
    return rows[0];
}

async function newBreed(name, description) {
    const { rows } = await pool.query("INSERT INTO breed (name, description) VALUES ($1, $2) RETURNING *", [name, description]);
    return rows[0];
}

async function editBreed(id, name, description) {
    const result = await pool.query("UPDATE breed SET name=($1), description=($2) WHERE id=($3)", [name, description, id]);
    return result.rowCount;
}

async function removeBreed(id) {
    const result = await pool.query("DELETE FROM breed WHERE id=($1)", [id]);
    return result.rowCount;
}

//stylist table
async function getAllStylists() {
    const { rows } = await pool.query("SELECT * FROM stylist");
    return rows;
}

async function getStylist(employeeId) {
    const { rows } = await pool.query("SELECT * FROM stylist WHERE employeeId=($1)", [employeeId]);
    return rows[0];
}

async function newStylist(name) {
    const { rows } = await pool.query("INSERT INTO stylist (name) VALUES ($1) RETURNING *", [name]);
    return rows[0];
}

async function editStylist(employeeId, name) {
    const result = await pool.query("UPDATE stylist SET name=($1) WHERE employeeId=($2)", [name, employeeId]);
    return result.rowCount;
}

async function removeStylist(employeeId) {
    const result = await pool.query("DELETE FROM stylist WHERE employeeId=($1)", [employeeId]);
    return result.rowCount;
}

//owner table
async function getAllOwners() {
    const { rows } = await pool.query("SELECT * FROM owner");
    return rows;
}

async function getOwner(id) {
    const { rows } = await pool.query("SELECT * FROM owner WHERE id=($1)", [id]);
    return rows[0];
}

async function newOwner(name, email, phone, dogs) {
    const { rows } = await pool.query("INSERT INTO owner (name, email, phone, dogs) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, phone, dogs]);
    return rows[0];
}

async function editOwner(id, name, email, phone, dogs) {
    const result = await pool.query("UPDATE owner SET name=($1), email=($2), phone=($3), dogs=($4) WHERE id=($5)", [name, email, phone, dogs, id]);
    return result.rowCount;
}

async function removeOwner(id) {
    const result = await pool.query("DELETE FROM owner WHERE id=($1)", [id]);
    return result.rowCount;
}

//haircut table
async function getAllHaircuts() {
    const { rows } = await pool.query("SELECT * FROM haircut");
    return rows;
}

async function getHaircut(id) {
    const { rows } = await pool.query("SELECT * FROM haircut WHERE id=($1)", [id]);
    return rows[0];
}

async function newHaircut(name, description, price, dog) {
    const { rows } = await pool.query("INSERT INTO haircut (name, description, price, dog) VALUES ($1, $2, $3, $4) RETURNING *", [name, description, price, dog]);
    return rows[0];
}

async function editHaircut(id, name, description, price, dog) {
    const result = await pool.query("UPDATE haircut SET name=($1), description=($2), price=($3), dog=($4) WHERE id=($5)", [name, description, price, dog, id]);
    return result.rowCount;
}

async function removeHaircut(id) {
    const result = await pool.query("DELETE FROM haircut WHERE id=($1)", [id]);
    return result.rowCount;
}

module.exports = {
    // Dog functions
    getAllDogs,
    getDog,
    editDog,
    removeDog,
    newDog,

    // Breed functions
    getAllBreeds,
    getBreed,
    newBreed,
    editBreed,
    removeBreed,

    // Stylist functions
    getAllStylists,
    getStylist,
    newStylist,
    editStylist,
    removeStylist,

    // Owner functions
    getAllOwners,
    getOwner,
    newOwner,
    editOwner,
    removeOwner,

    // Haircut functions
    getAllHaircuts,
    getHaircut,
    newHaircut,
    editHaircut,
    removeHaircut,

};
