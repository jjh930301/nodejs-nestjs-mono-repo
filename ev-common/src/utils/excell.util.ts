import { ObjectLiteral, Repository } from 'typeorm';

interface SelectAttributes {
  [key: string]: string;
}

export async function getExcelRow<T extends ObjectLiteral>(
  repository: Repository<T>,
  query: string,
  param: string[],
  selectAttributes: SelectAttributes,
) {
  let results = await repository.query(query, param);

  // Handle case where results are empty
  if (results.length === 0) {
    const newObj: Record<string, unknown> = {};
    Object.keys(selectAttributes).forEach((key) => {
      newObj[key] = '';
    });
    results = [newObj];
  }

  return results;
}
