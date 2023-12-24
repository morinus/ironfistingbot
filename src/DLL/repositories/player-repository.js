const db = require('../data/database.js');

const addPlayer = async (discordId, username) => {
    let conn;
    try {
      conn = await db.getConnection();
      const query = `INSERT INTO players (discord_id, username) VALUES (?, ?) ON DUPLICATE KEY UPDATE username = VALUES(username)`;
      await conn.query(query, [discordId, username]);
      console.log(`Player ${username} added or updated.`);

    } catch (error) {

      console.error('Error in addPlayer:', error);

    } finally {

      if (conn) conn.release();

    }
  };

  const getPlayer = async (discordId) => {

    let conn;
    try {

      conn = await db.getConnection();
      const query = `SELECT * FROM players WHERE discord_id = ?`;
      const result = await conn.query(query, [discordId]);
      return result[0]; // Assuming discord_id is unique

    } catch (error) {

      console.error('Error in getPlayer:', error);

    } finally {

      if (conn) conn.release();

    }
  };

  const updatePlayer = async (player) => {

    let conn;
    try {

      conn = await db.getConnection();
      const query = `UPDATE players SET username = ?, score = ? WHERE discord_id = ?`;
      await conn.query(query, [player.username, player.score, player.discord_id, player.opponents]);
      console.log(`Player with Discord ID ${player.discord_id} updated.`);

    } catch (error) {

      console.error('Error in updatePlayer:', error);
    } finally {

      if (conn) conn.release();
    }
  };

  const getAllPlayers = async () => {

    let conn;
    try {

      conn = await db.getConnection();
      const query = `SELECT * FROM players`;
      const result = await conn.query(query);
      return result;

    } catch (error) {

      console.error('Error in getAllPlayers:', error);

    } finally {

      if (conn) conn.release();

    }
  };

  const deletePlayer = async (discordId) => {

    let conn;
    try {

      conn = await db.getConnection();
      const query = `DELETE FROM players WHERE discord_id = ?`;
      await conn.query(query, [discordId]);
      console.log(`Player with Discord ID ${discordId} deleted.`);

    } catch (error) {

      console.error('Error in deletePlayer:', error);

    } finally {

      if (conn) conn.release();
    }
  };

  const updateOpponents = async (playerId, opponentId) => {

    const player = await getPlayer(playerId);
    const opponents = JSON.parse(player.opponents);

    let updatedOpponents;
    if(opponents == null) {

      updatedOpponents = [opponentId];
    } else {

      updatedOpponents = [...opponents, opponentId];
    }
  
    const query = `UPDATE players SET opponents = ? WHERE discord_id = ?`;
    await db.query(query, [JSON.stringify(updatedOpponents), playerId]);
  };
  
  module.exports = {
    addPlayer,
    getPlayer,
    updatePlayer,
    getAllPlayers,
    deletePlayer,
    updateOpponents
  };