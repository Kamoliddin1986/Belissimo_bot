import {Markup, Telegraf} from 'telegraf'
import dotenv from 'dotenv'

import nodemailer from 'nodemailer'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})




const bot = new Telegraf(process.env.BOT_TOKEN)

function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) 
    return true; 

   else 
    return false; 
}
bot.start( async (ctx) => {

    await ctx.reply("Emailni jo'nating")

})

bot.on("text", async ctx => {

    let Email = await isEmail(ctx.update.message.text)
    console.log(Email);
    if(Email){

        const mailOptions = {
            from: process.env.EMAIL,
            to: ctx.update.message.text,
            subject: "Accept your email",
            text: 'something....'
        }

        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log("Email sent>>>>", info.response);
            }
        })
        ctx.reply('email ok')
    }else{
        ctx.reply('email nok')
    }


})

bot.launch(console.log('RUNNING'))
