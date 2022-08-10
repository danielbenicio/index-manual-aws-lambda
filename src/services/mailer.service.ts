import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

import destinations from './destinations.json';

interface MailAttachment {
  filename: string;
  content: string;
}

interface MailMessage {
  subject: string;
  html: string;
  attachments?: MailAttachment[];
}

const MAIL_MESSAGE: MailMessage = {
  subject: 'Relatório - Pricing API',
  html: 'Aqui está o relatório atualizado.',
};

const transporter: Mail = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pricing.audit.report@gmail.com',
    pass: process.env.MAIL_GMAIL_APP_PASSWORD,
  },
});

export const sendReportMail = async (reportCsv: string) => {
  await Promise.all(
    destinations.map(async (destination) => transporter.sendMail({
      to: {
        name: destination.name,
        address: destination.address,
      },
      from: {
        name: process.env.MAIL_NAME as string,
        address: process.env.MAIL_ADDRESS as string,
      },
      subject: MAIL_MESSAGE.subject,
      html: MAIL_MESSAGE.html,
      attachments: [
        {
          filename: 'price-report.csv',
          content: reportCsv,
        },
      ],
    })),
  );
};
