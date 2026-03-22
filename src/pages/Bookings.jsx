import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookingStore } from '../store/bookingStore';
import UserProfileCard from '../components/ui/UserProfileCard';

const FALLBACK = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';

function StatusBadge({ status }) {
  const styles = {
    confirmed: 'bg-emerald-50 text-emerald-700',
    cancelled: 'bg-red-50 text-red-600',
    pending: 'bg-amber-50 text-amber-600',
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

function BookingCard({ booking, onCancel, navigate }) {
  const { listing: l, checkin, checkout, guests, totalPrice, status, id } = booking;
  return (
    <div className={`flex gap-5 bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow ${status === 'cancelled' ? 'opacity-60' : ''}`}>
      <img
        src={l.images[0]}
        alt={l.name}
        className="w-40 h-36 object-cover flex-shrink-0"
        onError={(e) => (e.target.src = FALLBACK)}
      />
      <div className="flex-1 py-4 pr-4 flex flex-col gap-1.5">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-stone-900 text-base">{l.name}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-xs text-stone-400">{l.city}, {l.country}</p>
        <p className="text-xs text-stone-600">
          {new Date(checkin).toLocaleDateString()} → {new Date(checkout).toLocaleDateString()}
          <span className="text-stone-400"> · {guests} guest{guests > 1 ? 's' : ''}</span>
        </p>
        <p className="text-sm text-stone-800">
          Total: <strong>${totalPrice}</strong>
        </p>
        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={() => navigate(`/listing/${l.id}`)}
            className="px-3.5 py-1.5 border border-stone-200 rounded-full text-xs font-medium text-stone-600 hover:border-stone-400 transition-colors"
          >
            View property
          </button>
          {status === 'confirmed' && (
            <button
              onClick={() => onCancel(id)}
              className="px-3.5 py-1.5 border border-red-200 rounded-full text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              Cancel booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, bookings, onCancel, navigate }) {
  if (!bookings.length) return null;
  return (
    <div className="mb-12">
      <h2 className="font-serif text-xl font-semibold text-stone-900 mb-4 pb-3 border-b border-stone-100">
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} onCancel={onCancel} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

export default function Bookings() {
  const { isAuthenticated } = useAuth();
  const { bookings, cancelBooking } = useBookingStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-32 gap-4">
        <div className="text-5xl">🔒</div>
        <h2 className="font-serif text-3xl font-semibold text-stone-900">Sign in to view your trips</h2>
        <p className="text-stone-400 text-sm">You need to be logged in to access your bookings.</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-2 px-8 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors"
        >
          Sign in
        </button>
      </div>
    );
  }

  const now = new Date();
  const upcoming = bookings.filter((b) => b.status === 'confirmed' && new Date(b.checkout) >= now);
  const past = bookings.filter((b) => b.status === 'confirmed' && new Date(b.checkout) < now);
  const cancelled = bookings.filter((b) => b.status === 'cancelled');

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-20">
      <div className="flex gap-10 items-start">

        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0 sticky top-[calc(72px+24px)]">
          <UserProfileCard />
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <h1 className="font-serif text-4xl font-bold text-stone-900 mb-8">My Trips</h1>

          {bookings.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-3">
              <div className="text-5xl">✈️</div>
              <h3 className="font-serif text-2xl font-semibold text-stone-800">No trips yet</h3>
              <p className="text-sm text-stone-400">Start exploring and book your first stay.</p>
              <button
                onClick={() => navigate('/')}
                className="mt-2 px-8 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                Discover stays
              </button>
            </div>
          ) : (
            <>
              <Section title="Upcoming" bookings={upcoming} onCancel={cancelBooking} navigate={navigate} />
              <Section title="Past trips" bookings={past} onCancel={cancelBooking} navigate={navigate} />
              <Section title="Cancelled" bookings={cancelled} onCancel={cancelBooking} navigate={navigate} />
            </>
          )}
        </main>

      </div>
    </div>
  );
}