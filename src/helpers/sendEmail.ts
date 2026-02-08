import nodemailer from "nodemailer";
import { isEmpty } from "lodash";
import Handlebars from "handlebars";
import Log from "./logger";

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
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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
