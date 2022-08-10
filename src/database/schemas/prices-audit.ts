import { getDynamoose } from '../index';

const dynamoose = getDynamoose();

const Schema = new dynamoose.Schema({
  id: { type: String, required: true },
  uploadId: {
    type: String,
    index: [
      {
        global: true,
        name: 'uploadId-index',
        project: true,
      },
    ],
  },
  sku: { type: String },
  salesChannel: { type: String },
  canal: { type: String },
  utmi: { type: String },
  preco: { type: Number },
  data_inicio: { type: String },
  data_fim: { type: String },
  log: { type: String },
  data_atualizacao: { type: String },
}, {
  saveUnknown: true,
});

const PricesAuditModel = dynamoose.model('lar-prices-logs-prod', Schema);

export { PricesAuditModel };
