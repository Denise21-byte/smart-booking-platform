import { useFilters } from '../../context/FiltersContext';

const PLACES = [
  { label: 'Paris, France',          value: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ' },
  { label: 'London, UK',             value: 'ChIJdd4hrwug2EcRmSrV3Vo6llI' },
  { label: 'New York, USA',          value: 'ChIJOwg_06VPwokRYv534QaPC8g' },
  { label: 'Tokyo, Japan',           value: 'ChIJ51cu8IcbXWARiRtXIothAS4' },
  { label: 'Barcelona, Spain',       value: 'ChIJ5TCOcRaYpBIRCmZHTz37sEQ' },
  { label: 'Amsterdam, Netherlands', value: 'ChIJVXealLU_xkcRja_At0z9AGQ' },
  { label: 'Rome, Italy',            value: 'ChIJu46S-ZZhLxMROG5lkwZ3D7k' },
  { label: 'Bali, Indonesia',        value: 'ChIJoQ8Q6NB1YTARUpedgl0xSAQ' },
];

const labelClass = 'block text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-2';
const inputClass = 'w-full px-3 py-2.5 border border-stone-200 rounded-lg bg-stone-50 text-sm text-stone-800 focus:outline-none focus:border-orange-400 transition-colors';

function ChipGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
            value === opt.value
              ? 'bg-orange-600 border-orange-600 text-white'
              : 'border-stone-200 text-stone-500 bg-white hover:border-orange-400 hover:text-orange-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function FilterPanel() {
  const { filters, setFilters, resetFilters } = useFilters();
  const today = new Date().toISOString().split('T')[0];

  return (
    <aside className="w-72 flex-shrink-0 bg-white border border-stone-200 rounded-3xl p-6 h-fit sticky top-[calc(72px+24px)]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-stone-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-orange-600 hover:opacity-70 transition-opacity"
        >
          Reset all
        </button>
      </div>

      {/* Destination */}
      <div className="mb-6">
        <label className={labelClass}>Destination</label>
        <select
          className={inputClass}
          value={filters.placeId}
          onChange={(e) => setFilters({ placeId: e.target.value })}
        >
          {PLACES.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Check-in */}
      <div className="mb-6">
        <label className={labelClass}>Check-in</label>
        <input
          type="date"
          className={inputClass}
          value={filters.checkin}
          min={today}
          onChange={(e) => setFilters({ checkin: e.target.value })}
        />
      </div>

      {/* Check-out */}
      <div className="mb-6">
        <label className={labelClass}>Check-out</label>
        <input
          type="date"
          className={inputClass}
          value={filters.checkout}
          min={filters.checkin || today}
          onChange={(e) => setFilters({ checkout: e.target.value })}
        />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className={labelClass}>
          Price: ${filters.minPrice} – ${filters.maxPrice}
        </label>
        <div className="space-y-2">
          <input
            type="range" min={0} max={500} step={10}
            value={filters.minPrice}
            className="w-full accent-orange-600 cursor-pointer"
            onChange={(e) => setFilters({ minPrice: +e.target.value })}
          />
          <input
            type="range" min={0} max={2000} step={10}
            value={filters.maxPrice}
            className="w-full accent-orange-600 cursor-pointer"
            onChange={(e) => setFilters({ maxPrice: +e.target.value })}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className={labelClass}>Minimum rating</label>
        <ChipGroup
          options={[
            { label: 'Any', value: 0 },
            { label: '4+', value: 4 },
            { label: '4.5+', value: 4.5 },
            { label: '4.8+', value: 4.8 },
          ]}
          value={filters.minRating}
          onChange={(v) => setFilters({ minRating: v })}
        />
      </div>

      {/* Bedrooms */}
      <div>
        <label className={labelClass}>Bedrooms</label>
        <ChipGroup
          options={[
            { label: 'Any', value: 0 },
            { label: '1+', value: 1 },
            { label: '2+', value: 2 },
            { label: '3+', value: 3 },
          ]}
          value={filters.bedrooms}
          onChange={(v) => setFilters({ bedrooms: v })}
        />
      </div>

    </aside>
  );
}