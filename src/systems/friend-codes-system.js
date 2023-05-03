const fs = require('fs');

let database = require('../../databases/friend-codes-database.json');


function saveFriendCodeToDatabase(userID, friendCode) {

    database[userID] = friendCode;

    saveData();
}

function getFriendCodeByUserID(userID) {

    if(database[userID] != null) {

        return database[userID];
    }
    else {

        return 0;
    }
}

function saveData() {

    fs.writeFileSync('databases/friend-codes-database.json', JSON.stringify(database));
}

module.exports = { saveFriendCodeToDatabase, getFriendCodeByUserID }