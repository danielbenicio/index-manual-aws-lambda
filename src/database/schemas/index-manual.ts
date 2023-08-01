import { getDynamoose } from '..';
import { Secret } from '../../entities/secrets.entity';

export function getIndexManualModel(secret: Secret) {
  const dynamoose = getDynamoose(secret);

  const Schema = new dynamoose.Schema({
    rule_id: { type: String, required: true },
    ativo: { type: String },
    SKU: { type: String },
    utmi: { type: String },
    pricetable_id: { type: String },
    fator: { type: String },
    benchmark: { type: String },
    ignorar_travas: { type: String },
    benchmark_1P: { type: String },
    benchmark_fallback: { type: String },
    fator_fallback: { type: String },
    trava_min: { type: String },
    trava_max: { type: String },
    loja_concorrente: { type: String },
    from_price: { type: String },
    cluster_loja: { type: String },
    fator_ativo: { type: String },
  }, {
    saveUnknown: true,
  });

  return dynamoose.model(
    process.env.AWS_INDEX_MANUAL_TABLE_PRICE as string,
    Schema,
  );
}
