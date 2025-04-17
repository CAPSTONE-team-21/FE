import { useState, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContextsh';

const MESSAGE_BLOCKS = [
  {
    userMessage: {
      id: 1,
      message: `이번에 에스네이처 아쿠아 스쿠알란 수분크림이라는 신제품을 출시했습니다.

      보습을 최우선으로 고려한 수분크림으로, 스쿠알란을 150,000ppm 고함량으로 넣었고, 다양한 히알루론산 계열 보습 성분도 배합했습니다.

      가볍고 산뜻한 제형이고 튜브형이라 위생적으로 사용하기 좋고, 무향, 저자극 처방으로 민감성 피부도 안심하고 사용할 수 있도록 설계했어요.

      용량은 60ml이고 가격은 24,000원입니다.

      제품에 대해 의견을 남겨주세요.`,
      skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    },
    botMessages: [
      {
        id: 2,
        skinType: 'DRY',
        message: `★ 장점 ★
        ★ 스쿠알란 고함유 (150,000ppm)
        - 유분 밸런스를 조절하고, 수분 증발을 막아줌
        - 블랙헤드/불필요한 유분 예방 + 겨울철 유수분막 형성에 효과적

        ★ 무자극 처방
        - 유해성분, 알러지 유발 성분 無 (화해 기준)

        ★ 가성비
        - 저렴한 가격 + 자주 할인

        ★ 건성/중성에게 적합
        - 피부 겉 유분막 형성용으로 좋음

        ☆ 단점 ☆
        ☆ 스쿠알란 특유의 유분감
        - 장점이자 단점
        - 처음엔 속건조 잡기 어려움, 두껍게 바르면 트러블 가능성
        - 민감성이라면 얇게 도포 권장

        ☆ 지성/트러블 피부엔 비추천
        - 겉도는 유분기 있음, 보습감보다 기름지게 느껴질 수 있음

        ★ 사용 팁 ★
        - 건성+민감성: 1차 수분 레이어 후 마무리 크림으로 사용
        - 블랙헤드 케어: 메컵 없는 날 고민 부위에 도포 후 클렌징 팁 적용

        ★ 추천 피부 ★
        - 건성, 민감성 / 애씨드류가 안 맞는 피부 / 겨울철 보습

        ☆ 비추천 피부 ☆
        - 극지성 / 속건조 중심 케어를 원하는 피부`,
      },
      {
        id: 3,
        skinType: 'OILY',
        message: `유명하다고 해서 써봤는데, 확실히 크림 발림성이 정말 부드럽고 좋았어요. 무거운 크림 제형이 아니라 부드러운 로션처럼 잘 펴 발리고, 얼굴에 착 감기는 느낌이 마음에 들었어요.
        무엇보다 흡수가 빨라서 끈적임이나 꾸덕거림 없이 산뜻하게 마무리되는 게 정말 좋더라구요! 저는 끈적한 거 싫어하는 편인데, 이건 바르고 나서 잔여감도 거의 없고 피부에 금방 스며들어서 만족했어요.
        그렇다고 보습력이 약한 것도 아니에요. 속보습까지 꽉 채워주는 느낌이라, 저는 자기 전에 바르면 아침에 피부가 뽀송하고 부드러워져서 기분이 정말 좋더라구요 ㅎㅎ
        에스네이처 제품은 이번이 처음인데, 써보고 너무 만족해서 주변 사람들한테도 추천했어요. 만약 이 제품이 살짝 가볍다 느껴진다면, 위에 무거운 크림 하나 더 덧발라도 괜찮을 것 같아요. 특히 요즘같이 날씨가 쌀쌀할 땐 그렇게 레이어링하면 보습감이 더 오래가더라구요!`,
      },
      {
        id: 4,
        skinType: 'SENSITIVE',
        message: `!작성자의 피부 타입 - 바람만 스쳐도 뒤집어지는 초민감성 악건성피부!

        성분 - 스쿠알란, 글리세린, 베타인 등 보습에 좋은 성분이 많고, 주의 성분도 없어 민감한 피부에도 좋을 것 같았지만, 제 피부에는 약간의 트러블이 생겼습니다.

        전체적인 평가 - 기존에 쓰던 수분크림이 리뉴얼되면서 새 제품을 찾던 중 이 제품을 사용했어요.
        튜브형 패키지와 가볍지만 보습감 있는 제형은 마음에 들었고, 겨울용으로도 괜찮다고 느꼈습니다.
        하지만 턱 주변에 트러블이 생겨 사용을 중단했어요. 꼭 이 제품 때문인지는 모르겠지만, 민감 피부라면 테스트 후 사용하는 걸 추천드려요.`,
      },
      {
        id: 5,
        skinType: 'COMBINATION',
        message: `겉수분 + 속수분 탄탄하게 채워주고 싶다면!

        # 에스네이처 아쿠아 스쿠알란 수분크림

        ☑️ 이 제품을 구매하게 된 이유!
        ➡️ 아침에 쓰던 크림을 다 써서 올리브영에 들렀는데, 에스네이처 크림이 행사 매대에 있더라구요. 발림성도 좋고 가격도 괜찮은 것 같아서 바로 구매하게 되었습니다!

        ☑️ 제품 특징
        ➡️ 당 성분 함유로 보습 + 활력 개선에 도움
        ➡️ 스쿠알란 성분 150,000ppm + 판테놀 + 8종 히알루론산 + 비타민 B5 함유로 수분영양탄력 개선에 도움
        ➡️ 계면활성제 + 향료 + 방부제 X

        ☑️ 전체적인 사용 후기
        ✔️ 향은 무향입니다!
        ✔️ 제형은 쫀쫀한 크림 제형입니다!
        ✔️ 부드럽게 펴 발려지고 약간의 쿨링감이 돌면서 흡수도 빠르게 됩니다!
        ✔️ 잔여감은 거의 없습니다!
        ✔️ 메이크업 하기 전 사용에도 좋아요!
        ✔️ 튜브 용기여서 너무 좋습니다
        ✔️ 20가지 주의성분 + 알레르기 유발성분 0개

        👎🏻 아쉬운 점
        ➡️ 크게 없지만 좀 더 용량이 크면 좋을 듯 합니다!

        😊추천 드립니다😊
        ➡️ 모든 피부용
        ➡️ 겉수분 + 속수분 때문에 고민이신 분`,
      },
    ],
  },
  {
    userMessage: {
      id: 6,
      message: `현재 이 제품은 최근 리뉴얼을 통해 성분을 한 번 더 정제했고, '피부 일차 자극 테스트'를 통과한 저자극 인증 제품으로 출시되었습니다.

      혹시 부담 없이 사용해보실 수 있도록 소량 샘플을 먼저 받아보실 수 있게 준비해드린다면, 테스트해볼 의향이 있으실까요?`,
      skinTypes: ['SENSITIVE'],
    },
    botMessages: [
      {
        id: 7,
        skinType: 'SENSITIVE',
        message: `오! 샘플을 받을 수 있다면 진짜 한 번 써보고 싶어요.
예전에는 성분도 괜찮아 보여서 기대했는데, 그래도 제 피부는 워낙 예민해서 바로 정품 쓰기엔 좀 부담되거든요ㅠㅠ

소량이라도 먼저 테스트해볼 수 있다면 진짜 너무 좋을 것 같고,
혹시 리뉴얼된 제형이 저한테 맞는다면 정품 구매도 충분히 고려할 수 있을 것 같아요!
초민감성 피부는 뭐든 조심해서 천천히 써보는 게 중요하니까요ㅎㅎ`,
      },
    ],
  },
];

const SkinTypeLabel = {
  DRY: '건성',
  OILY: '지성',
  SENSITIVE: '민감성',
  COMBINATION: '복합성',
};

const AnimatedGradientText = ({ text }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 500); // 애니메이션 적용 시작 지연 시간

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-wrap font-pretendard text-[16px] font-medium text-gray-stroke70">
      {text.split('').map((char, idx) => (
        <span
          key={`${char}-${idx}`}
          className="animate-gradientFade"
          style={{
            animationDelay: `${idx * 0.15}s`,
            animationFillMode: 'backwards', // 💥 핵심!
            display: 'inline-block',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

const BotChatContainer = () => {
  const { sendCount } = useChat();
  const [activeFilters, setActiveFilters] = useState({});
  const [visibleBotBlockIds, setVisibleBotBlockIds] = useState([]);

  const initializeFilter = (block) => {
    if (!(block.userMessage.id in activeFilters)) {
      setActiveFilters((prev) => ({
        ...prev,
        [block.userMessage.id]: block.userMessage.skinTypes[0],
      }));
    }
  };

  const handleFilterSelect = (blockId, type) => {
    setActiveFilters((prev) => ({
      ...prev,
      [blockId]: type,
    }));
  };

  useEffect(() => {
    if (sendCount > 0) {
      const block = MESSAGE_BLOCKS[sendCount - 1];
      const userId = block.userMessage.id;

      const timer = setTimeout(() => {
        setVisibleBotBlockIds((prev) => [...prev, userId]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [sendCount]);

  return (
    <div className="flex flex-col">
      {MESSAGE_BLOCKS.slice(0, sendCount).map((block) => {
        initializeFilter(block);
        const showBot = visibleBotBlockIds.includes(block.userMessage.id);

        return (
          <div key={block.userMessage.id} className="flex justify-center h-full py-[30px]">
            <div className="flex-col w-[760px] bg-white">
              <div className=" px-1 space-y-5">
                {/* 유저 메시지 */}
                <div className="flex justify-end">
                  <div className="bg-gray-stroke03 font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-[20px] max-w-[70%] whitespace-pre-line break-words my-6">
                    {block.userMessage.message}
                  </div>
                </div>
                <div className="border-t border-gray-stroke05"></div>

                <div className="my-6">
                  {/* 상태 문구 */}
                  <div className="pb-4 relative flex items-center justify-start">
                    <span
                      className={`transition-opacity duration-500 ease-in-out ${
                        showBot ? 'opacity-0' : 'opacity-100'
                      } flex items-center gap-[2px]`}
                    >
                      🧪 <AnimatedGradientText text="스포이드가 추출 중 입니다..." />
                    </span>

                    <span
                      className={`absolute left-0 transition-opacity duration-500 ease-in-out ${
                        showBot ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      🧪 추출 결과는 다음과 같습니다.
                    </span>
                  </div>

                  {showBot && (
                    <>
                      {/* 타입 선택 버튼 */}
                      <div className="flex w-full bg-main-buttonFill p-[4px] rounded-t-[10px] border border-main-typeStroke">
                        {block.userMessage.skinTypes.map((type) => {
                          const isActive = activeFilters[block.userMessage.id] === type;

                          return (
                            <button
                              key={type}
                              className={`w-1/4 mx-[2px]
                              ${isActive ? 'bg-white text-main' : 'text-main-buttonStroke'}
                              flex items-center justify-center py-1 rounded-[8px] text-[14px]
                              hover:bg-main-buttonFill hover:text-main-buttonHover duration-200
                            `}
                              onClick={() => handleFilterSelect(block.userMessage.id, type)}
                            >
                              {SkinTypeLabel[type]}
                            </button>
                          );
                        })}
                      </div>

                      {/* 봇 응답 */}
                      <div className="bg-white border-t-0 border-[1px] border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-b-[15px] max-w-[100%] whitespace-pre-line break-words">
                        {block.botMessages
                          .filter((msg) => msg.skinType === activeFilters[block.userMessage.id])
                          .map((msg) => (
                            <div key={msg.id}>{msg.message}</div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BotChatContainer;

// 타이핑버전
// import { useState, useEffect } from 'react';
// import { useChat } from '../../contexts/ChatContextsh';

// const MESSAGE_BLOCKS = [
//   {
//     userMessage: {
//       id: 1,
//       message: '이 제품 어떤 피부에 좋아요?',
//       skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
//     },
//     botMessages: [
//       { id: 2, skinType: 'DRY', message: '건성에게 괜찮습니다.' },
//       { id: 3, skinType: 'OILY', message: '지성 피부엔 피지 조절이 필요합니다.' },
//       { id: 4, skinType: 'SENSITIVE', message: '민감성에게는 자극이 될 수 있어요.' },
//       { id: 5, skinType: 'COMBINATION', message: '복합성은 부위별로 달라요.' },
//     ],
//   },
//   {
//     userMessage: {
//       id: 6,
//       message: '향은 어때요?',
//       skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
//     },
//     botMessages: [
//       {
//         id: 7,
//         skinType: 'DRY',
//         message: '건성 피부에게는 부드럽고 편안한 향이에요.'.repeat(50),
//       },
//       { id: 8, skinType: 'OILY', message: '지성 피부에겐 약간 무거울 수 있어요.' },
//       { id: 9, skinType: 'SENSITIVE', message: '민감성은 향료에 민감할 수 있어요.' },
//       { id: 10, skinType: 'COMBINATION', message: '복합성에겐 보통 무난합니다.' },
//     ],
//   },
// ];

// const SkinTypeLabel = {
//   DRY: '건성',
//   OILY: '지성',
//   SENSITIVE: '민감성',
//   COMBINATION: '복합성',
// };

// const AnimatedTyping = ({ text }) => {
//   const [visibleText, setVisibleText] = useState('');
//   useEffect(() => {
//     let i = 0;

//     const interval = setInterval(() => {
//       console.log(`[tick] i=${i}`);

//       if (i >= text.length) {
//         clearInterval(interval);
//         return;
//       }

//       const char = text.charAt(i);

//       setVisibleText((prev) => {
//         const next = prev + char;
//         console.log('🔠 visibleText:', next);
//         return next;
//       });

//       i++;
//     }, 100);

//     return () => clearInterval(interval);
//   }, [text]);

//   return (
//     <div className="flex flex-wrap text-[16px] font-pretendard font-medium text-gray/80">
//       {visibleText.split('').map((char, idx) => (
//         <span key={`${char}-${idx}`} className="font-pretendard font-medium">
//           {char === ' ' ? '\u00A0' : char}
//         </span>
//       ))}
//     </div>
//   );
// };

// const BotChatContainer = () => {
//   const { sendCount } = useChat();
//   const [activeFilters, setActiveFilters] = useState({});
//   const [visibleBotBlockIds, setVisibleBotBlockIds] = useState([]);

//   const initializeFilter = (block) => {
//     if (!(block.userMessage.id in activeFilters)) {
//       setActiveFilters((prev) => ({
//         ...prev,
//         [block.userMessage.id]: block.userMessage.skinTypes[0],
//       }));
//     }
//   };

//   const handleFilterSelect = (blockId, type) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       [blockId]: type,
//     }));
//   };

//   useEffect(() => {
//     if (sendCount > 0) {
//       const block = MESSAGE_BLOCKS[sendCount - 1];
//       const userId = block.userMessage.id;

//       const timer = setTimeout(() => {
//         setVisibleBotBlockIds((prev) => [...prev, userId]);
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [sendCount]);

//   return (
//     <div className="flex flex-col">
//       {MESSAGE_BLOCKS.slice(0, sendCount).map((block) => {
//         initializeFilter(block);
//         const showBot = visibleBotBlockIds.includes(block.userMessage.id);

//         return (
//           <div key={block.userMessage.id} className="flex justify-center h-full py-[30px]">
//             <div className="flex-col w-[760px] bg-white">
//               <div className=" px-1 space-y-5">
//                 {/* 유저 메시지 */}
//                 <div className="flex justify-end">
//                   <div className="bg-gray-stroke03 font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-[20px] max-w-[70%] whitespace-pre-line break-words my-6">
//                     {block.userMessage.message}
//                   </div>
//                 </div>
//                 <div className="border-t border-gray-stroke05"></div>

//                 <div className="my-6">
//                   {/* 상태 문구 */}
//                   <div className="pb-4 relative flex items-center justify-start gap-[6px]">
//                     {/* 고정된 이모지 (항상 보여야 함!) */}
//                     <span className="text-[16px] font-medium text-gray/80">🧪</span>

//                     {/* 상태 문구: 추출 중 */}
//                     <span
//                       className={`absolute left-[24px] transition-opacity duration-200 ease-in-out
//                         ${showBot ? 'opacity-0' : 'opacity-100'}
//                         font-pretendard text-[16px] font-medium text-gray/80`}
//                     >
//                       <AnimatedTyping text="스포이드가 추출 중 입니다..." />
//                     </span>

//                     {/* 상태 문구: 추출 결과 */}
//                     <span
//                       className={`absolute left-[24px] transition-opacity duration-200 ease-in-out
//                         ${showBot ? 'opacity-100' : 'opacity-0'}
//                         font-pretendard text-[16px] font-medium text-gray/80`}
//                     >
//                       추출 결과는 다음과 같습니다.
//                     </span>
//                   </div>

//                   {showBot && (
//                     <>
//                       {/* 타입 선택 버튼 */}
//                       <div className="flex basis-1/4 gap-2 bg-main-buttonFill p-[4px] rounded-t-[10px] border border-main-typeStroke">
//                         {block.userMessage.skinTypes.map((type) => (
//                           <button
//                             key={type}
//                             onClick={() => handleFilterSelect(block.userMessage.id, type)}
//                             className={`${
//                               activeFilters[block.userMessage.id] === type
//                                 ? 'bg-white text-main'
//                                 : 'text-main-buttonStroke'
//                             } basis-1/4 flex items-center justify-center py-1 rounded-[8px] text-[14px] hover:bg-main-buttonFill hover:text-main-buttonHover duration-200`}
//                           >
//                             {SkinTypeLabel[type]}
//                           </button>
//                         ))}
//                       </div>

//                       {/* 봇 응답 */}
//                       <div className="bg-white border-t-0 border-[1px] border-main-typeStroke font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-b-[15px] max-w-[100%] whitespace-pre-line break-words">
//                         {block.botMessages
//                           .filter((msg) => msg.skinType === activeFilters[block.userMessage.id])
//                           .map((msg) => (
//                             <div key={msg.id}>🤖 {msg.message}</div>
//                           ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default BotChatContainer;
