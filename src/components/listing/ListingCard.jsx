import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

const FALLBACK = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';

export default function ListingCard({ listing, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);
  const fav = isFavorite(listing.id);

  const next = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % listing.images.length);
  };
  const prev = (e) => {
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <article
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer border border-transparent hover:border-stone-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-[fadeUp_0.5s_ease_both]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={listing.images[imgIdx]}
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => (e.target.src = FALLBACK)}
        />

        {/* Prev / Next */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 text-stone-800 text-lg flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity shadow"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 text-stone-800 text-lg flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity shadow"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {listing.images.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === imgIdx ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Heart */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(listing); }}
          className={`absolute top-2.5 right-2.5 text-2xl leading-none transition-transform hover:scale-125 drop-shadow ${
            fav ? 'text-orange-600' : 'text-white'
          }`}
        >
          {fav ? '♥' : '♡'}
        </button>

        {/* Superhost badge */}
        {listing.isSuperhost && (
          <div className="absolute top-2.5 left-2.5 bg-white text-stone-900 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow">
            Superhost
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3.5">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-stone-400">{listing.city}, {listing.country}</span>
          <span className="text-xs font-semibold text-stone-800">
            ★ {listing.rating > 0 ? listing.rating.toFixed(1) : 'New'}
            {listing.reviewCount > 0 && (
              <span className="text-stone-400 font-normal"> ({listing.reviewCount})</span>
            )}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-stone-900 truncate mb-1">
          {listing.name}
        </h3>
        <p className="text-xs text-stone-400 mb-2">
          {listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''} · {listing.type}
        </p>
        <p className="text-sm text-stone-900">
          <strong className="font-bold">${listing.price}</strong>
          <span className="text-stone-400 font-normal"> / night</span>
        </p>
      </div>
    </article>
  );
}