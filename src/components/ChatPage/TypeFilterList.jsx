import TypeFilterItem from './TypeFilterItem';

const TypeFilterList = ({ selectedTypes, setSelectedTypes }) => {
  const typeLabels = {
    SENSITIVE: '민감성',
    DRY: '건성',
    OILY: '지성',
    COMBINATION: '복합성',
  };

  const DEFAULT_TYPES = Object.keys(typeLabels);

  const effectiveSelectedTypes = selectedTypes.length === 0 ? DEFAULT_TYPES : selectedTypes;

  const handleRemove = (typeToRemove) => {
    const newList = effectiveSelectedTypes.filter((t) => t !== typeToRemove);
    setSelectedTypes(newList);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {effectiveSelectedTypes.map((type, index) => (
        <TypeFilterItem
          key={`${index}-${type}`}
          type={typeLabels[type]}
          onRemove={() => handleRemove(type)}
        />
      ))}
    </div>
  );
};

export default TypeFilterList;
