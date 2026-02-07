import dotenv from 'dotenv';
dotenv.config({ path: '.env', override: true });

import './models'; //Carga las asociaciones
import { App } from './app';
import connectDB from './config/db';


const PORT = process.env.PORT || 3000;

const app = new App().getApp();

connectDB();

app.listen(PORT, () => {
    console.log(`[FlowSync] Servidor corriendo en puerto ${PORT}`)
})