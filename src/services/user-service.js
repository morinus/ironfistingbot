const fs = require('fs');

let database = require('../users-database.json');


function getUserData(userId) {

    if(database[userId]) {
        return database[userId];
    }
    else
    {
        database[userId] = {};

        return database[userId];
    }
}

function saveUserData(userId, data) {

    database[userId] = data;

    fs.writeFileSync('src/users-database.json', JSON.stringify(database));
}

module.exports = { getUserData, saveUserData }
