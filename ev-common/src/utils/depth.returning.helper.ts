export function depthRetruing<T extends Record<string, unknown>[]>(
  topName: string,
  entityNames: string[],
  data: T,
) {
  return data.map((row) => {
    const topEntity: Record<string, Record<string, unknown>> = {};

    // 열 이름을 기반으로 각 행을 처리합니다.
    for (const key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        let handled = false;

        // 중첩 엔티티 처리
        for (const entityName of entityNames) {
          if (key.startsWith(`${entityName}_`)) {
            const newKey = key.replace(`${entityName}_`, '');
            if (!topEntity[entityName]) topEntity[entityName] = {};
            topEntity[entityName][newKey] = row[key];
            handled = true;
            break;
          }
        }

        // 최상위 엔티티 처리
        if (!handled && key.startsWith(`${topName}_`)) {
          const newKey = key.replace(`${topName}_`, '');
          topEntity[newKey] = row[key] as Record<string, unknown>;
        }
      }
    }

    return topEntity;
  });
}
