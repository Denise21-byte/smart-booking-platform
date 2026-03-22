import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import ListingCard from '../components/listing/ListingCard';

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-1">Your Favorites</h1>
        <p className="text-stone-400 text-sm">
          {favorites.length} saved propert{favorites.length !== 1 ? 'ies' : 'y'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-3">
          <div className="text-6xl text-stone-200">♡</div>
          <h3 className="font-serif text-2xl font-semibold text-stone-800">No favorites yet</h3>
          <p className="text-sm text-stone-400 max-w-xs">
            Save properties you love by clicking the heart icon on any listing.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-2 px-8 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors"
          >
            Explore stays
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {favorites.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}