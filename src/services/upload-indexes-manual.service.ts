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

export { uploadIndexesManual };
