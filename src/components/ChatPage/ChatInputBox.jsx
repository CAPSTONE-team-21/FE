// import { useNavigate } from 'react-router-dom';

import { useChat } from '../../contexts/ChatContextsh';
import ChatTextInput from './ChatTextInput';
import SendButton from './SendButton';
import TypeSelectorBox from './TypeSelectorBox';
import { useLocation } from 'react-router-dom';

// 채팅 입력창 컨테이너
const ChatInputBox = ({ handleTestPost }) => {
  const {
    input,
    setInput,
    selectedTypes,
    setSelectedTypes,
    isDropdownOpen,
    setIsDropdownOpen,
    // handleSend,
    sessionMessages,
  } = useChat();
  // const nav = useNavigate();
  // dropdown 위로 열지 아래로 열지 판단
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/chat/');

  // const onSend = () => {
  //   handleSend();
  //   // nav('/chat/1'); // 예시: sessionId를 1번으로 가정
  // };

  return (
    <section className="w-full pb-3">
      <div
        className="
      flex flex-col w-[760px]
      rounded-[20px]
      border border-gray-stroke07 focus-within:border-gray-stroke10
      shadow-[0_2px_10px_rgba(0,0,0,0.03)] focus-within:shadow-[0_2px_10px_rgba(0,0,0,0.05)]
    "
      >
        <div className="flex w-full px-[12px] py-[10px] border-b border-gray-stroke07">
          <ChatTextInput input={input} setInput={setInput} />
          <SendButton onClick={handleTestPost} />
        </div>
        <div className="flex w-full items-center p-[12px]">
          <TypeSelectorBox
            sessionMessages={sessionMessages}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            direction={isDetailPage ? 'up' : 'down'}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatInputBox;

// // 연결 참고 코드
// const handleSend = async () => {
//   if (!input.trim()) return;

//   // 예: 백엔드 요청
//   const res = await fetch('/api/chat', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       message: input,
//       skinTypes: selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
//     }),
//   });

//   const data = await res.json();
//   const newSessionId = data.sessionId;

//   // 페이지 이동만 하면 됨!
//   nav(`/chat/${newSessionId}`);
//   setInput('');
// };
