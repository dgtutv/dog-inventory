const db = require("../db/queries");


const getHomePage = (req, res) => {
    getUsernames(req, res);
};

const getNewUserForm = (req, res) => {
    res.render("form");
};

async function createUser(req, res) {
    const { user } = req.body;
    await db.insertUsername(user);
    res.redirect("/");
};

async function getUsernames(req, res) {
    const usernames = await db.getAllUsernames();
    console.log("Usernames: ", usernames);
    res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

module.exports = {
    getHomePage,
    getNewUserForm,
    createUser,
    getUsernames
};