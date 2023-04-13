const userService = require('../services/user-service.js');

function getPointsByUserId(userId) {
    
    var data = validateUserPoints(userId);

    return data.points;
}

function addPointsToUserId(userId, points) {

    var data = validateUserPoints(userId);

    data.points += points;

    userService.saveUserData(userId, data);

    return data.points;
}

function validateUserPoints(userId) {

    var data = userService.getUserData(userId);

    if(data.points == null) {
        data.points = 0;

        userService.saveUserData(userId, data);
    }

    return data;
}

module.exports = { getPointsByUserId, addPointsToUserId }