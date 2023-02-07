export interface IndexManual {
  rule_id: string;
  ativo: string;
  SKU: string;
  utmi?: string;
  pricetable_id: string;
  fator: string;
  benchmark: string;
  ignorar_travas: string;
  benchmark_1P: string;
  benchmark_fallback: string;
  fator_fallback: string;
  trava_min: string;
  trava_max: string;
  loja_concorrente: string;
  from_price: string;
  cluster_loja?: string;
  fator_ativo?: string;
}
