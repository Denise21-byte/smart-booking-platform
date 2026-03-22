import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/rapidapi',
  headers: {
    'x-rapidapi-key': '89e6a7c4efmshd0b9a4e5d77f562p18986fjsn14a08544ad52',
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
});

const MOCK_LISTINGS = [
  {
    id: '1',
    name: 'Charming Studio in Le Marais',
    type: 'Entire studio',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    ],
    price: 120,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 128,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'Heating'],
    description: 'Beautiful studio in the heart of Le Marais. Walking distance to major attractions.',
    hostName: 'Sophie',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    isSuperhost: true,
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: '2',
    name: 'Luxury Apartment with Eiffel View',
    type: 'Entire apartment',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    ],
    price: 280,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 95,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Dishwasher', 'TV'],
    description: 'Stunning views of the Eiffel Tower from this luxury apartment.',
    hostName: 'Pierre',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
    isSuperhost: true,
    lat: 48.8584,
    lng: 2.2945,
  },
  {
    id: '3',
    name: 'Cozy Montmartre Artist Loft',
    type: 'Entire loft',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
    price: 95,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 203,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    amenities: ['WiFi', 'Kitchen', 'Heating', 'Washer'],
    description: 'Artistic loft in the bohemian Montmartre neighborhood.',
    hostName: 'Marie',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
    isSuperhost: false,
    lat: 48.8867,
    lng: 2.3431,
  },
  {
    id: '4',
    name: 'Modern Flat near Louvre',
    type: 'Entire apartment',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    price: 175,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 67,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'TV', 'Elevator'],
    description: 'Stylish modern apartment just 5 minutes walk from the Louvre museum.',
    hostName: 'Jean',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    isSuperhost: false,
    lat: 48.8606,
    lng: 2.3376,
  },
  {
    id: '5',
    name: 'Riverside Suite Saint-Germain',
    type: 'Entire apartment',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
      'https://images.unsplash.com/photo-1574643756048-65695ce09541?w=800',
    ],
    price: 210,
    currency: 'USD',
    rating: 4.95,
    reviewCount: 312,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'River view', 'Parking'],
    description: 'Breathtaking views of the Seine from this elegant Saint-Germain suite.',
    hostName: 'Claire',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claire',
    isSuperhost: true,
    lat: 48.8534,
    lng: 2.3343,
  },
  {
    id: '6',
    name: 'Budget Room near Bastille',
    type: 'Private room',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
    ],
    price: 55,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 89,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Heating', 'Shared kitchen'],
    description: 'Affordable private room in a friendly shared apartment near Bastille.',
    hostName: 'Lucas',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    isSuperhost: false,
    lat: 48.8533,
    lng: 2.3692,
  },
  {
    id: '7',
    name: 'Designer Penthouse Opera District',
    type: 'Entire penthouse',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    price: 450,
    currency: 'USD',
    rating: 5.0,
    reviewCount: 45,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    amenities: ['WiFi', 'Kitchen', 'Rooftop terrace', 'Jacuzzi', 'Concierge'],
    description: 'Spectacular penthouse with panoramic rooftop terrace in the Opera district.',
    hostName: 'Antoine',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Antoine',
    isSuperhost: true,
    lat: 48.8718,
    lng: 2.3316,
  },
  {
    id: '8',
    name: 'Sunny Studio Republique',
    type: 'Entire studio',
    city: 'Paris',
    country: 'France',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800',
    ],
    price: 80,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 156,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Washing machine', 'Heating'],
    description: 'Bright and sunny studio in the lively République neighborhood.',
    hostName: 'Emma',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    isSuperhost: false,
    lat: 48.8674,
    lng: 2.3633,
  },
];

export function normalizeListing(raw) {
  return raw;
}

export async function fetchListings(filters = {}) {
  // Try real API first
  try {
    const placeId = filters.placeId || 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ';
    const params = { placeId };
    if (filters.checkin) params.checkin = filters.checkin;
    if (filters.checkout) params.checkout = filters.checkout;

    const { data } = await apiClient.get('/api/v2/searchPropertyByPlaceId', { params });

    let raw = [];
    if (Array.isArray(data?.data?.list)) raw = data.data.list;
    else if (Array.isArray(data?.results)) raw = data.results;
    else if (Array.isArray(data?.data)) raw = data.data;
    else if (Array.isArray(data)) raw = data;

    if (raw.length > 0) {
      console.log('✅ Real API data loaded:', raw.length, 'listings');
      return raw.map(item => ({
        id: String(item.id || item.listingId || Math.random()),
        name: item.name || item.title || 'Unnamed Property',
        type: item.room_type || item.roomType || 'Entire place',
        city: item.city || item.location || 'Unknown',
        country: item.country || '',
        images: item.xl_picture_urls?.length
          ? item.xl_picture_urls.slice(0, 5)
          : item.picture_url?.picture
          ? [item.picture_url.picture]
          : item.contextualPictures?.length
          ? item.contextualPictures.slice(0, 5).map(p => p.picture)
          : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
        price: typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
          : item.price || item.pricing?.rate?.amount || 0,
        currency: item.currency || 'USD',
        rating: item.star_rating || item.avgRating || 0,
        reviewCount: item.reviews_count || item.reviewsCount || 0,
        bedrooms: item.bedrooms || 1,
        bathrooms: item.bathrooms || 1,
        maxGuests: item.person_capacity || item.personCapacity || 2,
        amenities: Array.isArray(item.amenities) ? item.amenities : [],
        description: item.description || item.summary || item.space || 'A wonderful place to stay.',
        hostName: item.user?.first_name || item.user?.name || 'Host',
        hostAvatar: item.user?.picture_url || item.user?.avatar || '',
        isSuperhost: item.user?.is_superhost || item.isSuperhost || false,
        lat: item.lat || item.coordinate?.latitude || 0,
        lng: item.lng || item.coordinate?.longitude || 0,
      }));
    }
  } catch (err) {
    console.warn('⚠️ API unavailable, using mock data. Status:', err.response?.status);
  }

  // Fallback to mock data
  console.log('📦 Using mock data');
  return MOCK_LISTINGS;
}

export async function fetchListingById(id, filters = {}) {
  const listings = await fetchListings(filters);
  return listings.find((l) => l.id === id) || null;
}

export default apiClient;