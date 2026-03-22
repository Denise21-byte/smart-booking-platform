import { createContext, useContext, useState } from 'react';

const defaultFilters = {
  placeId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
  checkin: '',
  checkout: '',
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  bedrooms: 0,
};

const FiltersContext = createContext(undefined);

export function FiltersProvider({ children }) {
  const [filters, setFiltersState] = useState(defaultFilters);

  const setFilters = (partial) =>
    setFiltersState((prev) => ({ ...prev, ...partial }));

  const resetFilters = () => setFiltersState(defaultFilters);

  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider');
  return ctx;
}