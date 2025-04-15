import { useState } from 'react';

const MESSAGE_BLOCKS = [
  {
    userMessage: {
      id: 1,
      message: '이 제품 어떤 피부에 좋아요?',
      skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    },
    botMessages: [
      { id: 2, skinType: 'DRY', message: '건성에게 괜찮습니다.' },
      { id: 3, skinType: 'OILY', message: '지성 피부엔 피지 조절이 필요합니다.' },
      { id: 4, skinType: 'SENSITIVE', message: '민감성에게는 자극이 될 수 있어요.' },
      { id: 5, skinType: 'COMBINATION', message: '복합성은 부위별로 달라요.' },
    ],
  },
  {
    userMessage: {
      id: 6,
      message: '향은 어때요?',
      skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    },
    botMessages: [
      { id: 7, skinType: 'DRY', message: '건성 피부에게는 부드럽고 편안한 향이에요.' },
      { id: 8, skinType: 'OILY', message: '지성 피부에겐 약간 무거울 수 있어요.' },
      { id: 9, skinType: 'SENSITIVE', message: '민감성은 향료에 민감할 수 있어요.' },
      { id: 10, skinType: 'COMBINATION', message: '복합성에겐 보통 무난합니다.' },
    ],
  },
];

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINATION: '복합성',
};

const BotChatContainer = () => {
  const [step, setStep] = useState(0);

  const handleSend = () => {
    setStep((prev) => Math.min(prev + 1, MESSAGE_BLOCKS.length));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="pb-4">🧪 추출 결과는 다음과 같습니다.</div>

      {MESSAGE_BLOCKS.slice(0, step).map((block, idx) => (
        <div key={`block-${idx}`} className="flex flex-col gap-2">
          {/* 사용자 질문 */}
          <div className="flex justify-end">
            <div className="bg-gray-stroke03 font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-[20px] max-w-[70%] whitespace-pre-line break-words my-6">
              {block.userMessage.message}
            </div>
          </div>

          {/* 타입 선택 버튼 */}
          <div className="flex basis-1/4 gap-2 bg-main-buttonFill p-[4px] rounded-t-[10px] border border-main-typeStroke">
            {block.userMessage.skinTypes.map((type) => (
              <div
                key={type}
                className="basis-1/4 flex items-center justify-center py-1 rounded-[8px] text-[14px] bg-white text-main"
              >
                {SkinTypeLabel[type]}
              </div>
            ))}
          </div>

          {/* 봇 메시지 */}
          <div className="bg-white border-t-0 border-[1px] border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-b-[15px] max-w-[100%] whitespace-pre-line break-words">
            {block.botMessages.map((msg) => (
              <div key={msg.id}>🤖 {msg.message}</div>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-4">
        <button onClick={handleSend} className="px-4 py-2 bg-main text-white rounded-[8px]">
          Send
        </button>
      </div>
    </div>
  );
};

export default BotChatContainer;