import { useState, useEffect, useRef } from 'react';

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINED: '복합성',
};

const BotChatContainer = ({ botMessages }) => {
  if (!botMessages || botMessages.length === 0) {
    return null;
  }

  const [activeType, setActiveType] = useState(botMessages[0].skinType);
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef([]);

  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (buttonRefs.current[activeIndex]) {
      const btn = buttonRefs.current[activeIndex];
      setIndicatorStyle({
        width: btn.offsetWidth,
        left: btn.offsetLeft,
      });
    }
  }, [activeIndex, botMessages]);

  const handleFilterSelect = (type, idx) => {
    setActiveType(type);
    setActiveIndex(idx);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative flex w-full bg-main-2 rounded-t-[10px]">
        {botMessages.map((msg, idx) => (
          <button
            key={idx}
            ref={(el) => (buttonRefs.current[idx] = el)}
            onClick={() => handleFilterSelect(msg.skinType, idx)}
            className={`
              z-10 text-[14px] py-[6px] [width:calc((100%)/4)]
              border-b-2 border-main-buttonFill
              ${activeType === msg.skinType ? 'text-main font-medium' : 'text-main-buttonStroke hover:text-main-chatFilterHover hover:border-main-typeStroke duration-200'}
            `}
          >
            {SkinTypeLabel[msg.skinType]}
          </button>
        ))}

        {/* 움직이는 강조선 */}
        <span
          className="absolute bottom-0 h-[2px] bg-main transition-all duration-500 ease-in-out"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
          }}
        />
      </div>

      <div className="bg-white border-b-2 border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] max-w-[100%] whitespace-pre-line break-words leading-[1.4]">
        {botMessages
          .filter((msg) => msg.skinType === activeType)
          .map((msg, idx) => (
            <div key={idx}>{msg.message}</div>
          ))}
      </div>
    </div>
  );
};

export default BotChatContainer;
