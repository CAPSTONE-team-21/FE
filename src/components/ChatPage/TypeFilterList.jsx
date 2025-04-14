import TypeFilterItem from './TypeFilterItem';

const TypeFilterList = ({ selectedTypes }) => {
  const typeLabels = {
    SENSITIVE: '민감성',
    DRY: '건성',
    OILY: '지성',
    COMBINATION: '복합성',
  };
  const toRender = selectedTypes.length === 0 ? Object.keys(typeLabels) : selectedTypes;

  return (
    <div className="flex flex-wrap gap-2">
      {toRender.map((type, index) => (
        <TypeFilterItem key={`${index}-${type}`} type={typeLabels[type]} />
      ))}
    </div>
  );
};
export default TypeFilterList;
