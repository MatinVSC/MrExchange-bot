import 'dotenv/config';
import express from "express";
import { Startbot } from "./app/bot/index.js";
// database
// import db from './app/database/connect.js';
import connectDB from './app/database/connect.js';

const init = async () => {
    // create server by express
    const CreateServer = () => {
        const app = express();
        const port = 3000;

        app.listen(port, () => {
            console.log(`server running : http://localhost:${port}`);
        });
    };

    // setup db
    const setupDb = () => {
        connectDB();
    };

    await CreateServer();
    await setupDb();
    Startbot();
};

init();