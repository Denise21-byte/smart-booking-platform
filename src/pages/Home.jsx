import FilterPanel from '../components/layout/FilterPanel';
import ListingCard from '../components/listing/ListingCard';
import { SkeletonGrid } from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';
import { useFilteredListings } from '../hooks/useListings';

export default function Home() {
  const { data: listings, isLoading, isError, refetch, isFetching } = useFilteredListings();

  return (
    <div className="min-h-[calc(100vh-72px)]">

      {/* Hero */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-700 text-white py-16 px-6 text-center">
        <h1 className="font-serif text-5xl font-bold mb-3 tracking-tight">
          Find your perfect stay
        </h1>
        <p className="text-lg text-stone-300">
          Discover unique places to stay around the world
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8 items-start">

        <FilterPanel />

        <main className="flex-1 min-w-0">
          {isFetching && !isLoading && (
            <div className="inline-block bg-stone-100 text-stone-600 text-xs font-medium px-4 py-2 rounded-full mb-4">
              Updating results…
            </div>
          )}

          {isLoading ? (
            <SkeletonGrid />
          ) : isError ? (
            <ErrorState
              title="Could not load listings"
              message="The API may be rate-limited. Please try again in a moment."
              onRetry={() => refetch()}
            />
          ) : listings && listings.length > 0 ? (
            <>
              <p className="text-sm text-stone-400 mb-5">
                {listings.length} stays found
              </p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                {listings.map((listing, i) => (
                  <ListingCard key={listing.id} listing={listing} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-stone-400">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="font-serif text-2xl font-semibold text-stone-800 mb-2">
                No listings found
              </h3>
              <p className="text-sm">Try adjusting your filters or selecting a different destination.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}