import {Markup, Telegraf} from 'telegraf'
import dotenv from 'dotenv'
dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start( async (ctx) => {
    ctx.reply('Start')
})

bot.launch(console.log('RUNNING'))
