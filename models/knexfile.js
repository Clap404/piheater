module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: "../db/db.sqlite"
        },
        migrations: {
            tableName: 'migrations'
        }
    },
};
