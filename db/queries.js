const pool = require("./pool");

//GET: getAll, getID
//PUT: editID
//POST: writeID
//DELETEL removeID

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function insertUsername(username) {
    //Insert like this to prevent injection attacks
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
    getAllUsernames,
    insertUsername
};
