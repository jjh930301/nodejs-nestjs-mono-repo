type NonEntityTypes = string | number | boolean | Date | null | undefined;

export type DropNonEntityTypesFromColumns<
  Entity,
  Columns extends keyof Entity,
> = {
  [K in keyof Entity]: K extends Columns
    ? Exclude<Entity[K], NonEntityTypes>
    : Entity[K];
};

export type DropLastFromTuple<T extends any[]> = T extends [...infer Rest, any]
  ? Rest
  : never;
