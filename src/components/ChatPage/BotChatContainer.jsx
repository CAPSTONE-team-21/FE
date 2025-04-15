import { useEffect, useState } from 'react';
import { createChatBlocksFrom } from '../../utils/chatHelpers';
import { useChat } from '../../contexts/ChatContextsh';

const EXAMPLE_MESSAGES = [
  {
    id: 1,
    sender: 'USER',
    skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    message: '이 제품 어떤 피부에 좋아요?',
  },
  {
    id: 2,
    sender: 'BOT',
    skinType: 'DRY',
    message: '건성에게 괜찮습니다.',
  },
  {
    id: 3,
    sender: 'BOT',
    skinType: 'OILY',
    message: '지성 피부엔 피지 조절이 필요합니다.',
  },
  {
    id: 4,
    sender: 'BOT',
    skinType: 'SENSITIVE',
    message: '민감성에게는 자극이 될 수 있어요.',
  },
  {
    id: 5,
    sender: 'BOT',
    skinType: 'COMBINATION',
    message: '복합성은 부위별로 달라요.',
  },
];

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINATION: '복합성',
};

const BotChatContainer = () => {
  const chatBlocks = createChatBlocksFrom(EXAMPLE_MESSAGES).slice(0, 1); // 첫 번째 블록만!
  const [activeFilters, setActiveFilters] = useState({});

  // 필터 초기값 설정
  useEffect(() => {
    const initial = {};
    chatBlocks.forEach((block) => {
      initial[block.userMessage.id] = block.userMessage.skinTypes[0]; // 첫 번째 타입 선택
    });
    setActiveFilters(initial);
  }, []);

  const handleFilterSelect = (blockId, type) => {
    setActiveFilters((prev) => ({
      ...prev,
      [blockId]: type,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="pb-4">🧪 추출 결과는 다음과 같습니다.</div>

      {chatBlocks.map((block) => (
        <div key={block.userMessage.id}>
          {/* 타입 선택 버튼 */}
          <div className="flex basis-1/4 gap-2 bg-main-buttonFill p-[4px] rounded-t-[10px] border border-main-typeStroke">
            {block.userMessage.skinTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterSelect(block.userMessage.id, type)}
                className={`${
                  activeFilters[block.userMessage.id] === type
                    ? 'bg-white text-main'
                    : 'text-main-buttonStroke'
                } basis-1/4 flex items-center justify-center py-1 rounded-[8px] text-[14px] hover:bg-main-buttonFill hover:text-main-buttonHover duration-200`}
              >
                {SkinTypeLabel[type]}
              </button>
            ))}
          </div>

          {/* 봇 메시지 */}
          <div className="bg-white border-t-0 border-[1px] border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-b-[15px] max-w-[100%] whitespace-pre-line break-words">
            {block.botMessages
              .filter((msg) => msg.skinType === activeFilters[block.userMessage.id])
              .map((msg) => (
                <div key={msg.skinType}>🤖 {msg.message}</div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BotChatContainer;
