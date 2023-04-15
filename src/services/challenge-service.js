const fs = require('fs');
const challengeConfig = require('../../configs/challenge-config.json');
let database = require('../../databases/challenges-database.json');

function getChallengesRemainingByUserId(userId) {

    var data = validateRemainingChallenges(userId);

    return data;
}

function spendPrinceChallenge(userId) {

    var data = validateRemainingChallenges(userId);

    if(data.princeChallengesRemaining == 0) {

        return false;
    }

    data.princeChallengesRemaining--;

    saveData(userId, data);

    return true;
}

function spendKingChallenge(userId) {

    var data = validateRemainingChallenges(userId);

    if(data.kingChallengesRemaining == 0) {

        return false;
    }

    data.kingChallengesRemaining--;

    saveData(userId, data);

    return true;
}

function validateRemainingChallenges(userId) {

    if(database[userId]) {

        return database[userId];
    }
    else {

        var data = { "kingChallengesRemaining" : challengeConfig.remainingKingChallenges,
                     "princeChallengesRemaining" : challengeConfig.remainingPrinceChallenges }

        saveData(userId, data);

        return data;
    }
}

function saveData(userId, data) {

    database[userId] = data;

    fs.writeFileSync('databases/challenges-database.json', JSON.stringify(database));
}

function scheduledChallengesReset() {

    var today = new Date();

    if(today.getDay() === 1 && today.getHours() === 0) {

        for (const userId in database) {

            var data = database[userId];
            data.princeChallengesRemaining = challengeConfig.remainingPrinceChallenges;
            data.kingChallengesRemaining = challengeConfig.remainingKingChallenges;

            userService.saveUserData(userId, data);
        }
    }
}

module.exports = { getChallengesRemainingByUserId, spendPrinceChallenge, spendKingChallenge, scheduledChallengesReset }
