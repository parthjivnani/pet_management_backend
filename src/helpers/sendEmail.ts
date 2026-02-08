import * as nodemailer from 'nodemailer';
import { isEmpty } from 'lodash';
import * as Handlebars from 'handlebars';
import Log from './logger';

interface ISendMail {
  to: string;
  subject: string;
  html: string;
  data?: object;
}

export default class EmailService {
  private logger = Log.getLogger();
  public sendMail = async ({ to, html, subject }: ISendMail) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      secure: false,
    });
    try {
      const info = await transporter.sendMail({
        from: process.env.DEFAULT_FROM, // Sender address
        to, // Receiver address
        subject, // Subject line
        html, // html body
      });
      this.logger.info(`Mail sent: %s ${info.messageId}`);
    } catch ({ message }) {
      this.logger.error(`Mail not sent: ${message}`);
    }
  };
}
