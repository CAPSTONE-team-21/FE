import { useRef, useEffect } from 'react';
import TypeSelector from './TypeSelector';
import TypeFilterList from './TypeFilterList';

const TypeSelectorBox = ({
  isDropdownOpen,
  setIsDropdownOpen,
  selectedTypes,
  setSelectedTypes,
  chatSessions,
}) => {
  const ref = useRef(null);

  const onClick = () => {
    setIsDropdownOpen(true);
  };

  // 바깥 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false); // 바깥 클릭 시 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setIsDropdownOpen]);

  return (
    <div className="flex gap-3">
      <div ref={ref}>
        <TypeSelector
          onClick={onClick}
          isDropdownOpen={isDropdownOpen}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </div>
      <div className="flex">
        <TypeFilterList selectedTypes={selectedTypes} chatSessions={chatSessions} />
      </div>
    </div>
  );
};

export default TypeSelectorBox;
