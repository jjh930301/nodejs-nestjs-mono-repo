export const toNumber = (values: any, valid: { default: number }) => {
  let { value } = values;

  if (value === undefined || value === null) {
    value = valid.default;
  }

  return Number(value);
};

export const toBoolen = (values: any, valid: { default: boolean }) => {
  const { value } = values;

  if (value === undefined || value === null) {
    return Boolean(valid.default);
  }

  return Boolean(value);
};
