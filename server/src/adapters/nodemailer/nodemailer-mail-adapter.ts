import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'
import nodeMailgun, { Options } from 'nodemailer-mailgun-transport'
import 'dotenv/config'


const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const transport = nodemailer.createTransport(nodeMailgun(auth as Options))

export class NodemailerEmailAdpter implements MailAdapter {
  async sendEmail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <me@samples.mailgun.org>',
      to: 'leonarbat8@gmail.com',
      subject,
      html: body
    }, (err, data) => {
      if (err) console.log(err)
    })
  }
}