import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useBookingStore } from '../../store/bookingStore';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const bookings = useBookingStore((s) => s.bookings);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeBookings = bookings.filter((b) => b.status === 'confirmed').length;

  const linkClass = (path) =>
    `relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? 'bg-stone-200 text-stone-900'
        : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 h-[72px]">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-orange-600 text-lg">◆</span>
          <span className="font-serif text-xl font-semibold text-stone-900 tracking-tight">
            StayScape
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 flex-1">
          <Link to="/" className={linkClass('/')}>Discover</Link>
          <Link to="/favorites" className={linkClass('/favorites')}>
            Favorites
            {favorites.length > 0 && (
              <span className="bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/bookings" className={linkClass('/bookings')}>
            Trips
            {activeBookings > 0 && (
              <span className="bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {activeBookings}
              </span>
            )}
          </Link>
        </div>

        {/* User Area */}
        <div className="flex-shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100 transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover bg-stone-200"
                />
                <span className="text-sm font-medium text-stone-800 capitalize">
                  {user.name}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-stone-200 rounded-2xl shadow-xl min-w-[200px] overflow-hidden animate-[fadeIn_0.15s_ease]">
                  <div className="px-4 py-3 border-b border-stone-100">
                    <p className="text-sm font-semibold capitalize">{user.name}</p>
                    <p className="text-xs text-stone-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { navigate('/bookings'); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                  >
                    My Trips
                  </button>
                  <button
                    onClick={() => { navigate('/favorites'); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                  >
                    Favorites
                  </button>
                  <div className="border-t border-stone-100">
                    <button
                      onClick={() => { logout(); setMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}