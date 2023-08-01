import { IndexManual } from '../entities/index-manual.entity';
import { getIndexManualModel } from '../database/schemas/index-manual';
import { Secret } from '../entities/secrets.entity';

const uploadIndexesManual = async (indexesManual: IndexManual[], secret: Secret) => {
  const IndexManualModel = getIndexManualModel(secret);

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

const getIndexes = async (secret: Secret) => {
  const IndexManualModel = getIndexManualModel(secret);

  const indexesResponse = await IndexManualModel.scan().all().exec();

  const indexes = indexesResponse.toJSON() as IndexManual[];
  return indexes;
};

export { uploadIndexesManual, getIndexes };
