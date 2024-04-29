import { SetMetadata } from '@nestjs/common';

export const CUSTOM_REPOSITORY = 'CUSTOM_REPOSITORY';

// eslint-disable-next-line @typescript-eslint/ban-types
export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(CUSTOM_REPOSITORY, entity);
}
