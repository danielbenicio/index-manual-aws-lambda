import { IndexManual } from '../entities/index-manual.entity';
import { IndexManualModel } from '../database/schemas/index-manual';

const CHUNK_SIZE = 25;

const queryChunk = (arr: IndexManual[]) => {
  const tempArr = [];

  for (let i = 0, len = arr.length; i < len; i += CHUNK_SIZE) {
    tempArr.push(arr.slice(i, i + CHUNK_SIZE));
  }

  return tempArr;
};

const uploadIndexesManual = async (indexesManual: IndexManual[]) => {
  // Split indexes manual array in chunks because the limit of batch put is 25
  const chunkedIndexesManual = queryChunk(indexesManual);

  await Promise.all(
    chunkedIndexesManual.map(async (chunk) => {
      await IndexManualModel.batchPut(chunk);
    }),
  );
};

export { uploadIndexesManual };
