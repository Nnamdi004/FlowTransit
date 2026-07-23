import type { FavouriteLocation } from '@/types';
import { apiClient } from './apiClient';

export async function listFavourites(userId: string): Promise<FavouriteLocation[]> {
  const { data } = await apiClient.get<FavouriteLocation[]>('/favourites', { params: { userId } });
  return data;
}

export async function addFavourite(
  payload: Omit<FavouriteLocation, 'id'>,
): Promise<FavouriteLocation> {
  const { data } = await apiClient.post<FavouriteLocation>('/favourites', payload);
  return data;
}

export async function removeFavourite(id: string): Promise<void> {
  await apiClient.delete(`/favourites/${id}`);
}
