import env from '../config/config'
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: env("MAIL"),
      pass: env("APP_PASS_MAIL")
    },
})

export const sendMail = async (to, subject, html) => {
    try {
        let result = await transporter.sendMail({
            from: env("MAIL"), 
            to: to,
            subject: subject,
            // text: "Hello world?", // plain text body
            html: html,
        })
        return result
    } catch (error) {
        return error
    }
}