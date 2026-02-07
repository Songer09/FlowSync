import sequelize from './database';

const connectDB = async (): Promise<void>  => {
    try{
        await sequelize.authenticate();
        console.log('[DB] Conexión a PostgreSQL establecida.');
    }catch (error) {
        console.error('[DB] Error al conectar con PostgreSQL: ', error);
        process.exit(1);
    }
};

export default connectDB;