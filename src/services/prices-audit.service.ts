import { PricesAudit } from '../entities/prices-audit.entity';
import { PricesAuditModel } from '../database/schemas/prices-audit';

const getPriceAuditLog = async (uploadId: string) => {
  const pricesAuditResponse = await PricesAuditModel
    .query('uploadId')
    .eq(uploadId)
    .all()
    .exec();
  const pricesAuditLog = pricesAuditResponse.toJSON() as PricesAudit[];

  return pricesAuditLog;
};

export { getPriceAuditLog };
