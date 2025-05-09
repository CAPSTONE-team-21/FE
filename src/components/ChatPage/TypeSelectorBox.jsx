import { useRef, useEffect, useState } from 'react';
import TypeSelector from './TypeSelector';
import TypeFilterList from './TypeFilterList';
import { IconTail } from '../../utils/icons';
import { IconStarY } from '../../utils/icons';

const TypeSelectorBox = ({
  skinTypes,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedTypes,
  setSelectedTypes,
  sessionMessages,
  direction = 'up',
  onDelete,
}) => {
  const ref = useRef(null);
  const dropdownPositionClass = direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'; // 아래 방향은 top 기준!
  const [isClick, setIsClick] = useState(false);

  const onClick = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsClick(true);
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
    <div className="flex w-full relative gap-3 overflow-visible">
      <div ref={ref} className="relative">
        {!isClick && (
          <div className="">
            <div className="flex justify-center absolute left-1/2 w-[180px] transform -translate-x-1/2 bottom-14 rounded-[20px] px-2 py-2 text-[13px] font-medium bg-gradient-to-r from-main to-main-purple text-white ">
              <img className="w-3 mr-1.5" src={IconStarY} alt="" />
              피부 타입을 선택해주세요!
            </div>
            <div className="absolute transform -translate-x-1/2 bottom-12 left-1/2">
              <img className="w-4" src={IconTail} alt="" />
            </div>
          </div>
        )}
        <TypeSelector
          onClick={onClick}
          isDropdownOpen={isDropdownOpen}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          dropdownPositionClass={dropdownPositionClass}
          direction={direction}
          skinTypes={skinTypes}
        />
      </div>
      <div className="flex">
        <TypeFilterList
          selectedTypes={selectedTypes}
          skinTypes={skinTypes}
          sessionMessages={sessionMessages}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default TypeSelectorBox;
