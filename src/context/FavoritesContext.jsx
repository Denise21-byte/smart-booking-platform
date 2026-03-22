import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('stayscape_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('stayscape_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = (listing) => {
    setFavorites((prev) =>
      isFavorite(listing.id)
        ? prev.filter((f) => f.id !== listing.id)
        : [...prev, listing]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}