const mysql = require('mysql');
const util = require('util')
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'ivan_drw',
  password        : '123',
  database        : 'drw_drw'
});

/*const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'drw_bd',
  password        : 'PL8ekxkj',
  database        : 'drw_drw'
});
*/
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query);
module.exports = pool
