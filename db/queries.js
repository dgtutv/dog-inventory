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
    const result = await pool.query("DELETE dog WHERE id=($1)", [id]);
    return result.rowCount;
}

async function newDog(breed, preferredStylist) {
    const result = await pool.query("INSERT INTO dog (breed, preferredStylist) VALUES ($1, $2) *", [breed, preferredStylist]);
    return result.rowCount; // Returns the newly created dog with auto-generated ID
}

//haircut table

//stylist table

//owner table

//breed table

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function insertUsername(username) {
    //Insert like this to prevent injection attacks
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
    getAllDogs,
    getDog,
    editDog,
    removeDog,
    newDog,
    getAllUsernames,
    insertUsername
};
