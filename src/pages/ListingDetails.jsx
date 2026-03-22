import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilters } from '../context/FiltersContext';
import { useListingDetail } from '../hooks/useListings';
import { useFavorites } from '../context/FavoritesContext';
import BookingForm from '../components/listing/BookingForm';
import Loader from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';

const FALLBACK = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';

export default function ListingDetails() {
  const { id } = useParams();
  const { filters } = useFilters();
  const { data: listing, isLoading, isError } = useListingDetail(id, filters);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imgIdx, setImgIdx] = useState(0);

  if (isLoading) return <Loader text="Loading property details…" />;
  if (isError || !listing) return (
    <ErrorState title="Property not found" message="We couldn't find this listing." />
  );

  const fav = isFavorite(listing.id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-20">

      {/* Gallery */}
      <div className="mb-8">
        <div className="rounded-3xl overflow-hidden aspect-video mb-3">
          <img
            src={listing.images[imgIdx]}
            alt={listing.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = FALLBACK)}
          />
        </div>
        {listing.images.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto">
            {listing.images.slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                onClick={() => setImgIdx(i)}
                className={`w-28 h-20 object-cover rounded-xl cursor-pointer flex-shrink-0 border-2 transition-all ${
                  i === imgIdx ? 'border-orange-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                onError={(e) => (e.target.src = FALLBACK)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex gap-12 items-start">

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-stone-400 capitalize">{listing.type} · {listing.city}, {listing.country}</span>
            <button
              onClick={() => toggleFavorite(listing)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                fav
                  ? 'border-orange-400 text-orange-600'
                  : 'border-stone-200 text-stone-600 hover:border-orange-400'
              }`}
            >
              {fav ? '♥ Saved' : '♡ Save'}
            </button>
          </div>

          <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3 leading-tight">
            {listing.name}
          </h1>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            {listing.rating > 0 && (
              <span className="font-semibold text-stone-900">★ {listing.rating.toFixed(1)}</span>
            )}
            {listing.reviewCount > 0 && (
              <span className="text-sm text-stone-400 underline">{listing.reviewCount} reviews</span>
            )}
            {listing.isSuperhost && (
              <span className="bg-stone-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Superhost
              </span>
            )}
          </div>

          <div className="flex gap-5 text-sm text-stone-700 mb-6 flex-wrap">
            <span>👥 {listing.maxGuests} guests</span>
            <span>🛏 {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''}</span>
            <span>🚿 {listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
          </div>

          <hr className="border-stone-100 mb-6" />

          {/* Host */}
          <div className="flex items-center gap-4 mb-6">
            {listing.hostAvatar && (
              <img
                src={listing.hostAvatar}
                alt={listing.hostName}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
            <div>
              <p className="font-semibold text-stone-900">Hosted by {listing.hostName}</p>
              {listing.isSuperhost && (
                <p className="text-xs text-stone-400">Superhost · Top-rated host</p>
              )}
            </div>
          </div>

          <hr className="border-stone-100 mb-6" />

          {/* Description */}
          <h2 className="font-serif text-xl font-semibold mb-3">About this place</h2>
          <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line mb-6">
            {listing.description}
          </p>

          {/* Amenities */}
          {listing.amenities.length > 0 && (
            <>
              <hr className="border-stone-100 mb-6" />
              <h2 className="font-serif text-xl font-semibold mb-4">What this place offers</h2>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.slice(0, 12).map((a, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-stone-200 rounded-full text-sm text-stone-700 bg-stone-50"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Booking Form */}
        <aside className="w-[340px] flex-shrink-0 sticky top-[calc(72px+24px)]">
          <BookingForm listing={listing} />
        </aside>

      </div>
    </div>
  );
}