module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./tarifler.sqlite3",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    useNullAsDefault: true, //boş hücrelere null değeri ataması için
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
};
