import internal from 'stream';
import csv from 'csvtojson';

const parseCsvToJson = async (csvFile?: internal.Readable) => {
  if (!csvFile) {
    return;
  }

  const jsonArray = await csv({
    delimiter: [';'],
  }).fromStream(csvFile);

  return jsonArray;
};

export { parseCsvToJson };
