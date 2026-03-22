export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-3 border-stone-200 border-t-orange-600 rounded-full animate-spin" />
      <p className="text-sm text-stone-400">{text}</p>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-3xl overflow-hidden border border-stone-100">
          <div className="aspect-[4/3] bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 bg-[length:400px_100%] animate-[shimmer_1.4s_infinite]" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-3/5 bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 rounded-full animate-[shimmer_1.4s_infinite]" />
            <div className="h-3 w-4/5 bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 rounded-full animate-[shimmer_1.4s_infinite]" />
            <div className="h-3 w-2/5 bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 rounded-full animate-[shimmer_1.4s_infinite]" />
          </div>
        </div>
      ))}
    </div>
  );
}