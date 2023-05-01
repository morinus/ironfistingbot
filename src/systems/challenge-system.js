const fs = require('fs');
//const challengeConfig = require('../../configs/challenge-config.json');
const challengeConfig = require('../../configs/test-challenge-config.json');
let database = require('../../databases/challenges-database.json');
const { isFunction } = require('util');


function challengeRole(userID, roleID) {

    switch(roleID) {
        case challengeConfig.kingRoleID:
            return challengeKing(userID);
        case challengeConfig.princeRoleID:
            return challengePrince(userID);
        case challengeConfig.mokujinRoleID:
            return challengeMokujin(userID);
        default:
            return false;
    }
}

function challengeKing(userID) {

    if(database.kingChallengers.includes(userID)) return false;
    
    database.kingChallengers.push(userID);
    
    saveData();

    return true;
}

function challengePrince(userID) {

    if(database.princeChallengers.includes(userID)) return false;
    
    database.princeChallengers.push(userID);
    
    saveData();

    return true;
}

function challengeMokujin(userID) {

    if(database.mokujinChallengers.includes(userID)) return false;
    
    database.mokujinChallengers.push(userID);
    
    saveData();

    return true;
}

function challengeDreamTeam(userID, partnerID) {

    if(database.dreamTeamChallengers.includes(userID)) return false;
    if(database.dreamTeamChallengers.includes(partnerID)) return false;

    database.dreamTeamChallengers.push(userID);
    database.dreamTeamChallengers.push(partnerID);

    saveData();

    return true;
}

function getPendingChallengers(roleID) {

    switch(roleID) {

        case challengeConfig.dreamTeamRoleID:
            return database.dreamTeamChallengers;
        case challengeConfig.kingRoleID:
            return database.kingChallengers;
        case challengeConfig.princeRoleID:
            return database.princeChallengers;
        case challengeConfig.mokujinRoleID:
            return database.mokujinChallengers;
        default:
            return null;
    }
}

function withdrawFromChallenge(userID, roleID) {

    switch(roleID) {

        case challengeConfig.dreamTeamRoleID:
            database.dreamTeamChallengers = removeUserFromTeamArray(userID, database.dreamTeamChallengers);
            break;
        case challengeConfig.kingRoleID:
            database.kingChallengers = removeUserFromArray(userID, database.kingChallengers);
            break;
        case challengeConfig.princeRoleID:
            database.princeChallengers = removeUserFromArray(userID, database.princeChallengers);
            break;
        case challengeConfig.mokujinRoleID:
            database.mokujinRoleID = removeUserFromArray(userID, database.mokujinChallengers);
            break;
        default:
            break;
    }

    saveData();
}

function removeUserFromArray(userID, array) {

    if(array.length > 1) {
        var index = array.indexOf(userID);
        array.splice(index, 1);    
    } else {
        array.pop();
    }

    return array;
}

function removeUserFromTeamArray(userID, array) {

    var index = array.indexOf(userID);
    array.splice(index, 1);

    if(index % 2 == 0) {

        array.splice(index, 1);
    } else {

        array.splice(index - 1, 1);
    }

    return array;
}

function saveData() {

    fs.writeFileSync('databases/challenges-database.json', JSON.stringify(database));
}

function resetChallenges() {

    database.kingChallengers = [];
    database.princeChallengers = [];
    database.mokujinChallengers = [];
    database.dreamTeamChallengers = [];
        
    saveData();
}

function scheduledChallengesReset() {

    //var today = new Date();

    //if(today.getDay() === 1 && today.getHours() === 0 && today.getMinutes() === 0) {

        resetChallenges();

        //console.log(today.toLocaleDateString() + " " + today.toLocaleTimeString() + " --- Weekly Challenges Reset!");
    //}
}

module.exports = { scheduledChallengesReset,  challengeRole, challengeDreamTeam, getPendingChallengers, withdrawFromChallenge}
