/**
 * neighborhoodImages.ts
 *
 * Rule: Supabase photo_url only. No local bundled assets as substitutes for entity photos.
 *
 * Both functions now return null unconditionally.
 * Callers must source images from Supabase or show nothing.
 */

import type { ImageSourcePropType } from "react-native";
export type NeighborhoodImageSource = ImageSourcePropType;

/**
 * @deprecated Always returns null. Use Supabase photo_url directly.
 */
export function getRioNeighborhoodImage(
  _neighborhoodName: string | undefined | null,
): null {
  return null;
}

/**
 * @deprecated Always returns null. Use Supabase photo_url directly.
 */
export function getNeighborhoodImage(
  _neighborhoodName: string,
): NeighborhoodImageSource {
  return null as unknown as NeighborhoodImageSource;
}
