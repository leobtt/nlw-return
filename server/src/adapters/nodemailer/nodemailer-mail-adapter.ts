import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bb2fb17565715e",
    pass: "a2c84c3520aa37"
  }
});

export class NodemailerEmailAdpter implements MailAdapter {
  async sendEmail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Leonardo Batista <leonarbat8@gmail.com>',
      subject,
      html: body
    })
  }
}