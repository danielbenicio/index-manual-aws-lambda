import { getPriceAuditLog } from './services/prices-audit.service';
import { saveCsvReport } from './services/save-report.service';
import { sendReportMail } from './services/mailer.service';

interface LambdaEventPayload {
  uploadId: string;
}

export const lambdaHandler = async (event: LambdaEventPayload) => {
  try {
    console.log('Lambda has been started.');

    console.log('Event payload: ', JSON.stringify(event));

    console.log('Starting prices audit log fetch.');
    const pricesAuditLog = await getPriceAuditLog(event.uploadId);

    console.log('Starting save audit log report file.');
    const reportCsv = await saveCsvReport(pricesAuditLog);

    console.log('Starting send audit log report.');
    await sendReportMail(reportCsv);

    console.log('Process has ended.');
  } catch (error) {
    console.log(error);
  }
};
