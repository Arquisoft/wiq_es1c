const mariadb = require('mariadb');

class DatabaseManager {
    constructor(config) {
        this.pool = mariadb.createPool(config);
    }
    async query(sql) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            return await conn.query(sql);
        } catch (error) {
            throw new Error(`Error executing SQL query: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }
    async close() {
        await this.pool.end();
    }
}
module.exports = DatabaseManager;