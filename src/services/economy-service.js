const fs = require('fs');

let usersDatabase = require('../users-database.json');

function getPointsByUserId(userId) {
    
    if(usersDatabase[userId]) {

        return usersDatabase[userId].points;

    } else {

        usersDatabase[userId] = { points: 0 };

        saveUsers();

        console.log(`Created new user with ID:${userId} in the database.`);

        return 0;
    }
}

function addPointsToUserId(userId, points) {
    if(usersDatabase[userId]) {

        usersDatabase[userId].points += points;
        saveUsers();

        return usersDatabase[userId].points;
    } 
    else {
        
        usersDatabase[userId] = { points: points}
        saveUsers();

        return points;
    }
}

function saveUsers() {

    fs.writeFileSync('src/users-database.json', JSON.stringify(usersDatabase));
}

module.exports = { getPointsByUserId, addPointsToUserId }