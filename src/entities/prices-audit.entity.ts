export interface PricesAudit {
  id: string;
  uploadId: string;
  sku: string;
  salesChannel: string;
  canal?: string;
  utmi: string;
  preco: number;
  data_inicio: string;
  data_fim: string;
  log: string;
  data_atualizacao: string;
}
