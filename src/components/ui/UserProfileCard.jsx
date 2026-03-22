import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useBookingStore } from '../../store/bookingStore';

export default function UserProfileCard() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const bookings = useBookingStore((s) => s.bookings);
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;

  if (!user) return null;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 text-center">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-stone-100"
      />
      <h3 className="font-serif text-lg font-semibold capitalize mb-0.5">{user.name}</h3>
      <p className="text-xs text-stone-400 mb-5">{user.email}</p>

      <div className="flex justify-center gap-8 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-stone-900">{confirmed}</p>
          <p className="text-[11px] text-stone-400 uppercase tracking-wider">Trips</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-stone-900">{favorites.length}</p>
          <p className="text-[11px] text-stone-400 uppercase tracking-wider">Saved</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="px-6 py-2 border border-stone-200 rounded-full text-sm text-stone-500 hover:border-red-400 hover:text-red-500 transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}