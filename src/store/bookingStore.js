import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function calcNights(checkin, checkout) {
  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  return Math.max(1, Math.ceil((d2 - d1) / 86400000));
}

export const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: [],

      addBooking: (listing, checkin, checkout, guests) => {
        const nights = calcNights(checkin, checkout);
        const booking = {
          id: `booking_${Date.now()}`,
          listingId: listing.id,
          listing,
          checkin,
          checkout,
          guests,
          totalPrice: listing.price * nights,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ bookings: [...state.bookings, booking] }));
        return booking;
      },

      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status: 'cancelled' } : b
          ),
        })),

      getBooking: (id) => get().bookings.find((b) => b.id === id),
    }),
    { name: 'stayscape_bookings' }
  )
);