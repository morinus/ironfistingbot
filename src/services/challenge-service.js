const userService = require('../services/user-service.js');
const challengeConfig = require('../../configs/challenge-config.json');
let database = require('../users-database.json');

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

    userService.saveUserData(userId, data);
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

    var today = new Date();

    if(today.getDay() === 1) {

        for (const userId in database) {

            var data = database[userId];
            data.princeChallengesRemaining = 1;
            data.kingChallengesRemaining = 1;

            userService.saveUserData(userId, data);
        }
    }
}

module.exports = { getPrinceChallengesRemainingByUserId, getKingChallengesRemainingByUserId, spendPrinceChallenge, spendKingChallenge, scheduledChallengesReset }
