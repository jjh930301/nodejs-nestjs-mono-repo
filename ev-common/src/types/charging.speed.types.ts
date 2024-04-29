export const ChargingSpeed = {
  slow: 'slow',
  medium: 'medium',
  fast: 'fast',
  super_fast: 'super_fast',
} as const;

export type ChargingSpeedTypes =
  (typeof ChargingSpeed)[keyof typeof ChargingSpeed];
