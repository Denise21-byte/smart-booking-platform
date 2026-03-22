import { useQuery } from '@tanstack/react-query';
import { fetchListings, fetchListingById } from '../services/api';
import { useFilters } from '../context/FiltersContext';

export function useListings() {
  const { filters } = useFilters();

  return useQuery({
    queryKey: ['listings', filters.placeId, filters.checkin, filters.checkout],
    queryFn: () => fetchListings(filters),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

export function useListingDetail(id, filters) {
  return useQuery({
    queryKey: ['listing', id, filters?.placeId],
    queryFn: () => fetchListingById(id, filters || {}),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    enabled: !!id,
    retry: 2,
  });
}

export function useFilteredListings() {
  const { filters } = useFilters();
  const query = useListings();

  const filtered = (query.data || []).filter((listing) => {
    if (filters.minPrice && listing.price < filters.minPrice) return false;
    if (filters.maxPrice && listing.price > filters.maxPrice) return false;
    if (filters.minRating && listing.rating < filters.minRating) return false;
    if (filters.bedrooms && listing.bedrooms < filters.bedrooms) return false;
    return true;
  });

  return { ...query, data: filtered };
}