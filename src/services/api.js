import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com/api/v2',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
});

export function normalizeListing(raw) {
  const images = [];

  if (raw.xl_picture_urls?.length) {
    images.push(...raw.xl_picture_urls.slice(0, 5));
  } else if (raw.picture_url?.picture) {
    images.push(raw.picture_url.picture);
  }

  if (images.length === 0) {
    images.push(
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    );
  }

  const price =
    typeof raw.price === 'string'
      ? parseFloat(raw.price.replace(/[^0-9.]/g, ''))
      : raw.price || 0;

  return {
    id: raw.id || String(Math.random()),
    name: raw.name || 'Unnamed Property',
    type: raw.room_type || 'Entire place',
    city: raw.city || 'Unknown',
    country: raw.country || '',
    images,
    price,
    currency: raw.currency || 'USD',
    rating: raw.star_rating || 0,
    reviewCount: raw.reviews_count || 0,
    bedrooms: raw.bedrooms || 1,
    bathrooms: raw.bathrooms || 1,
    maxGuests: raw.person_capacity || 2,
    amenities: Array.isArray(raw.amenities) ? raw.amenities : [],
    description: raw.description || raw.summary || 'A wonderful place to stay.',
    hostName: raw.user?.first_name || 'Host',
    hostAvatar: raw.user?.picture_url || '',
    isSuperhost: raw.user?.is_superhost || false,
    lat: raw.lat || 0,
    lng: raw.lng || 0,
  };
}

export async function fetchListings(filters = {}) {
  const placeId = filters.placeId || 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ';
  const params = { placeId };
  if (filters.checkin) params.checkin = filters.checkin;
  if (filters.checkout) params.checkout = filters.checkout;

  const { data } = await apiClient.get('/searchPropertyByPlaceId', { params });

  let raw = [];
  if (Array.isArray(data?.results)) raw = data.results;
  else if (Array.isArray(data)) raw = data;
  else if (Array.isArray(data?.data)) raw = data.data;

  return raw.map(normalizeListing);
}

export async function fetchListingById(id, filters = {}) {
  const listings = await fetchListings(filters);
  return listings.find((l) => l.id === id) || null;
}

export default apiClient;