"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    "dev": {
        "username": process.env.POSTGRES_USERNAME,
        "password": process.env.POSTGRES_PASSWORD,
        "database": process.env.POSTGRES_DATABASE_FINAL,
        "host": process.env.POSTGRES_HOST,
        "dialect": "postgres",
    },
    "prod": {
        "username": "",
        "password": "",
        "database": "udagram_prod",
        "host": "",
        "dialect": "postgres"
    },
    "jwt": {
        "secret": process.env.JWT_SECRET
    }
};
//# sourceMappingURL=config.js.map