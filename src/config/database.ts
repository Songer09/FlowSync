import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'frowsync_dev';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432', 10);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false,
    define: {
        underscored: true,
        timestamps: true,
    },
});

export default sequelize;