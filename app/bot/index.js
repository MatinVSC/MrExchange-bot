import { session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import TelegrafI18n from "i18n-telegraf";
//session
import { Mongo } from "@telegraf/session/mongodb";
// middleware
import Command from "./middleware/command.js";
import Action from "./middleware/action.js";
import Keyboard from "./middleware/keyboard.js";
import Session from "./middleware/session.js";
// limiter
import { limit } from "@grammyjs/ratelimiter";


const bot = new Telegraf(process.env.TOKEN);

const i18nL = new TelegrafI18n({
    directory: "locales",
    sessionName: "session",
    useSession: true,
});

const Startbot = () => {
    bot.use(
        limit({
            timeFrame: 1000,
            limit: 1,
            onLimitExceeded: async (ctx) => {
                await ctx.reply("اسپم نکن بچه !!");
            },
        })
    );

    const store = Mongo({
        url: process.env.DATABASE,
        database: "MrExchange",
    });

    bot.use(session({ store, defaultSession: (ctx) => ({ __language_code: ctx.from.language_code }) }));

    // middleware i18n
    bot.use(i18nL.middleware());

    // middleware command
    bot.command(/.*/, Command);

    // middleware action
    bot.on("callback_query", Action);

    // middleware keyboard
    bot.on(message("text"), Keyboard);

    // middleware session
    bot.on([message("text"), message("forward_origin")], Session);

    bot.launch();
};

export { Startbot, bot, i18nL };