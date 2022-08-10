import { PricesAudit } from '../entities/prices-audit.entity';

const saveCsvReport = async (pricesAuditLog: PricesAudit[]) => {
  const reportValues = pricesAuditLog.map((log) => JSON.stringify(Object.values(log)));

  // Add fields to the beginning of array
  const reportFields = JSON.stringify(Object.keys(pricesAuditLog[0]));
  reportValues.unshift(reportFields);

  const csv = reportValues.join('\n')
    .replace(/(^\[)|(\]$)/mg, '');

  return csv;
};

export { saveCsvReport };
