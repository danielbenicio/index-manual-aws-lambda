import { IndexManual } from '../entities/index-manual.entity';

const convertJSONToCSV = async (indexes: IndexManual[]) => {
  const formattedIndexes = indexes.map((index) => ({
    rule_id: index.rule_id,
    ativo: index.ativo,
    SKU: index.SKU,
    utmi: index.utmi,
    pricetable_id: index.pricetable_id,
    fator: index.fator,
    benchmark: index.benchmark,
    ignorar_travas: index.ignorar_travas,
    benchmark_1P: index.benchmark_1P,
    benchmark_fallback: index.benchmark_fallback,
    fator_fallback: index.fator_fallback,
    trava_min: index.trava_min,
    trava_max: index.trava_max,
    loja_concorrente: index.loja_concorrente,
    from_price: index.from_price,
    cluster_loja: index.cluster_loja,
  }));

  const csvValues = formattedIndexes.map((index) => JSON.stringify(Object.values(index)));

  // Add fields to the beginning of array
  const csvFields = JSON.stringify(Object.keys(formattedIndexes[0]));
  csvValues.unshift(csvFields);

  const csv = csvValues.join('\n')
    .replace(/(^\[)|(\]$)/mg, '');

  return csv;
};

export { convertJSONToCSV };
