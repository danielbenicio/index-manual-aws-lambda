import { IndexManual } from '../entities/index-manual.entity';

const convertJSONToCSV = async (indexes: IndexManual[]) => {
  const csvValues = indexes.map((index) => JSON.stringify(Object.values(index)));

  // Add fields to the beginning of array
  const csvFields = JSON.stringify(Object.keys(indexes[0]));
  csvValues.unshift(csvFields);

  const csv = csvValues.join('\n')
    .replace(/(^\[)|(\]$)/mg, '');

  return csv;
};

export { convertJSONToCSV };
