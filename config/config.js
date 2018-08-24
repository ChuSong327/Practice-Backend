const environment = process.env.NODE_ENV || "development";

module.exports = {
    user: "chu",
    host: environment === "development" ? "localhost" : process.env.DATABASE_URL,
    database: "chatterbox",
    port: 5432
};

