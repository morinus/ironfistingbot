const fs = require('fs');
const economyConfig = require('../../configs/economy-config.json');
let database = require('../../databases/economy-database.json');

function getPointsByUserId(userId) {
    
    var data = validateUserPoints(userId);

    return data.points;
}

function addPointsToUserId(userId, points) {

    var data = validateUserPoints(userId);

    data.points += points;

    saveData(userId, data);

    return data.points;
}

function validateUserPoints(userId) {

    if(database[userId]) {

        return database[userId];
    }
    else {

        var data = { "points" : economyConfig.startingPoints }

        saveData(userId, data);

        return data;
    }
}

function saveData(userId, data) {

    database[userId] = data;

    fs.writeFileSync('databases/economy-database.json', JSON.stringify(database));
}

module.exports = { getPointsByUserId, addPointsToUserId }