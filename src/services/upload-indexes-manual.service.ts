import { IndexManual } from '../entities/index-manual.entity';
import { IndexManualModel } from '../database/schemas/index-manual';

const uploadIndexesManual = async (indexesManual: IndexManual[]) => {
  try {
    await Promise.all(
      indexesManual.map(async (index) => {
        const indexManual = new IndexManualModel(index);

        await indexManual.save();
      }),
    );
  } catch (err) {
    console.log(err);
  }
};

const getIndexes = async () => {
  const indexesResponse = await IndexManualModel.scan().all().exec();

  const indexes = indexesResponse.toJSON() as IndexManual[];
  return indexes;
};

export { uploadIndexesManual, getIndexes };
