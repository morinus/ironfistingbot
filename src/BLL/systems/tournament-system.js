const playerRepository = require('../../DLL/repositories/player-repository.js');

async function createMatches() {

    const players = await playerRepository.getAllPlayers();

    players.sort((a, b) => b.score - a.score);
  
    // Handle BYE
    if (players.length % 2 !== 0) {
      await assignBye(players);
    }
  
    let matches = [];
    let matchedPlayers = new Set();
  
    for (let i = 0; i < players.length; i++) {

      if (matchedPlayers.has(players[i].discord_id)) continue;
  
      for (let j = i + 1; j < players.length; j++) {

        if (!matchedPlayers.has(players[j].discord_id) && !await havePlayedBefore(players[i], players[j])) {

          matches.push({ player1: players[i], player2: players[j] });
          matchedPlayers.add(players[i].discord_id).add(players[j].discord_id);

          await playerRepository.updateOpponents(players[i].discord_id, players[j].discord_id);
          await playerRepository.updateOpponents(players[j].discord_id, players[i].discord_id);

          break;
        }
      }
    }
  
    return matches;
  }
  
  async function havePlayedBefore(player1, player2) {
    
    const player = await playerRepository.getPlayer(player1.discord_id);
    const opponents = JSON.parse(player.opponents);
    if(opponents == null) return false;
    const contains = opponents.includes(player2.discord_id);

    return contains;
  }
  
  async function assignBye(players) {
    
    let lowestScorePlayer = players[players.length - 1];
    lowestScorePlayer.score += 6;

    await playerRepository.updatePlayer(lowestScorePlayer);
  }

  module.exports = {
    createMatches
  };