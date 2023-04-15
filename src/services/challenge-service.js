const challengeConfig = require('../../configs/challenge-config.json');

let database = require('../../databases/challenges-database.json');

function getPrinceChallengesRemainingByUserId(userId) {

    var data = validateRemainingChallenges(userId);

    return data.princeChallengesRemaining;
}

function getKingChallengesRemainingByUserId(userId) {
    
    var data = validateRemainingChallenges(userId);

    return data.kingChallengesRemaining;
}

function spendPrinceChallenge(userId) {

    var data = validateRemainingChallenges(userId);

    data.princeChallengesRemaining--;
}

function spendKingChallenge(userId) {

    var data = validateRemainingChallenges(userId);

    data.kingChallengesRemaining--;

    userService.saveUserData(userId, data);
}

function validateRemainingChallenges(userId) {

    var data = userService.getUserData(userId);

    if(data.princeChallengesRemaining == null) {
        data.princeChallengesRemaining = challengeConfig.remainingPrinceChallenges;
    }

    if(data.kingChallengesRemaining == null) {
        data.kingChallengesRemaining = challengeConfig.remainingKingChallenges;
    }

    userService.saveUserData(userId, data);

    return data;
}

function scheduledChallengesReset() {

    return;

    var today = new Date();

    console.log("Challenges reset!");

    //if(today.getDay() === 1 && today.getHours() === 0) {

        for (const userId in database) {

            var data = database[userId];
            data.princeChallengesRemaining = challengeConfig.remainingPrinceChallenges;
            data.kingChallengesRemaining = challengeConfig.remainingKingChallenges;

            userService.saveUserData(userId, data);
        }
    //}
}

module.exports = { getPrinceChallengesRemainingByUserId, getKingChallengesRemainingByUserId, spendPrinceChallenge, spendKingChallenge, scheduledChallengesReset }
