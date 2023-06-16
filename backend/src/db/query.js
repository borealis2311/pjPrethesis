const pool = require("./init.sql");

exports.findUserByUser = async (username) => {
    const sql = "SELECT * FROM users WHERE username=?";
    const [result] = await pool.query(sql, [username]);
    return result.length > 0 ? result[0] : false;
}

exports.findUserByUsername = async (username) => {
    const sql = "SELECT * FROM users WHERE username=?";
    const [result] = await pool.query(sql, [username]);
    return result.length > 0 ? result[0] : false;
}

exports.findUserByEmail = async (email) => {
    const sql = "SELECT * FROM users WHERE email=?";
    const [result] = await pool.query(sql, [email]);
    return result.length > 0 ? result[0] : false;
}

exports.insertUser = async (data) => {
    const sql = "INSERT INTO users SET ?";
    const [result] = await pool.query(sql, [data]);
    return true;
}