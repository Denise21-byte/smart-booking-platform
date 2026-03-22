import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBookingStore } from '../../store/bookingStore';

export default function BookingForm({ listing }) {
  const { isAuthenticated } = useAuth();
  const addBooking = useBookingStore((s) => s.addBooking);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState('');

  const nights =
    checkin && checkout
      ? Math.max(0, Math.ceil((new Date(checkout) - new Date(checkin)) / 86400000))
      : 0;

  const total = nights * listing.price;

  const handleReserve = () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (!checkin || !checkout) { setError('Please select your dates.'); return; }
    if (nights < 1) { setError('Check-out must be after check-in.'); return; }
    setError('');
    addBooking(listing, checkin, checkout, guests);
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-lg text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500 text-white text-2xl flex items-center justify-center mx-auto mb-4">
          ✓
        </div>
        <h3 className="font-serif text-xl font-semibold mb-2">Booking Confirmed!</h3>
        <p className="text-sm text-stone-500 mb-5">Your trip to {listing.city} is all set.</p>
        <button
          onClick={() => navigate('/bookings')}
          className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
        >
          View My Trips
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-lg">
      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-serif text-2xl font-bold text-stone-900">${listing.price}</span>
        <span className="text-stone-400 text-sm">/ night</span>
      </div>
      {listing.rating > 0 && (
        <p className="text-xs text-stone-400 mb-5">
          ★ {listing.rating.toFixed(1)}
          {listing.reviewCount > 0 && ` · ${listing.reviewCount} reviews`}
        </p>
      )}

      {/* Dates */}
      <div className="border border-stone-200 rounded-xl overflow-hidden mb-3">
        <div className="flex divide-x divide-stone-200">
          <div className="flex-1 p-3">
            <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-1">Check-in</p>
            <input
              type="date" value={checkin} min={today}
              onChange={(e) => setCheckin(e.target.value)}
              className="w-full text-sm text-stone-800 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex-1 p-3">
            <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-1">Check-out</p>
            <input
              type="date" value={checkout} min={checkin || today}
              onChange={(e) => setCheckout(e.target.value)}
              className="w-full text-sm text-stone-800 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Guests */}
      <div className="border border-stone-200 rounded-xl p-3 mb-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-1">Guests</p>
        <select
          value={guests}
          onChange={(e) => setGuests(+e.target.value)}
          className="w-full text-sm text-stone-800 bg-transparent focus:outline-none"
        >
          {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleReserve}
        className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-semibold text-base hover:bg-orange-700 transition-colors mb-4"
      >
        {isAuthenticated ? 'Reserve' : 'Sign in to reserve'}
      </button>

      {/* Breakdown */}
      {nights > 0 && (
        <div className="border-t border-stone-100 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-stone-600">
            <span>${listing.price} × {nights} night{nights > 1 ? 's' : ''}</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-100 pt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-stone-400 mt-3">You won't be charged yet</p>
    </div>
  );
}