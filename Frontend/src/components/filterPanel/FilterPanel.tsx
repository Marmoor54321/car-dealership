import "./FilterPanel.css";

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
}

export const FilterPanel = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: FilterPanelProps) => {
  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Szukaj po marce lub modelu..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="">-- Domyślne --</option>
        <option value="price_asc">Cena: Rosnąco</option>
        <option value="price_desc">Cena: Malejąco</option>
        <option value="year_asc">Rok: Najstarsze</option>
        <option value="year_desc">Rok: Najnowsze</option>
      </select>
    </div>
  );
};
