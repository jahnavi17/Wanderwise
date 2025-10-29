import QuickFilters from '../QuickFilters';

export default function QuickFiltersExample() {
  const handleFilterClick = (filter: string) => {
    console.log('Filter clicked:', filter);
  };

  return <QuickFilters onFilterClick={handleFilterClick} />;
}
