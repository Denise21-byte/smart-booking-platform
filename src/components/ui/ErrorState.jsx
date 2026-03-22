export default function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load the listings. Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center text-center py-20 gap-3">
      <div className="text-5xl mb-2">⚠</div>
      <h3 className="font-serif text-2xl font-semibold text-stone-900">{title}</h3>
      <p className="text-sm text-stone-400 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-6 py-2.5 bg-orange-600 text-white rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}