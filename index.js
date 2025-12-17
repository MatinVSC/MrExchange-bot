import 'dotenv/config';
import express from "express";
import { Startbot } from "./app/bot/index.js";
// database
import connectDB from './app/database/connect.js';
// router
import router from './app/router/index.js';
// cron job
import cron from 'node-cron';
import withdrawFailed from './app/cronjobs/withdraw.js';
import updatePriceCrypto from './app/cronjobs/updatePriceCrypto.js';
import sendAll from './app/cronjobs/sendAll.js';

const init = async () => {
    // create server by express
    const CreateServer = () => {
        const app = express();
        const port = 3000;

        app.listen(port, () => {
            console.log(`server running : http://localhost:${port}`);
        });

        app.use(router);
    };

    // setup db
    const setupDb = () => {
        connectDB();
    };

    // cron job
    const Cronjobs = () => {
        cron.schedule('* * * * *', () => {
            withdrawFailed();
            updatePriceCrypto();
            sendAll();
        });
    };

    await CreateServer();
    await setupDb();
    await Cronjobs();
    Startbot();
};

init();