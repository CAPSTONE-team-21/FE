import { createContext, useContext, useState, useRef } from 'react';

export const ChatContextsh = createContext();

export const ChatProvider = ({ children }) => {
  const [sessionMessages, setSessionMessages] = useState([]); // 채팅방 별 메세지
  const [input, setInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const idRef = useRef(1);

  const handleSend = () => {
    if (!input.trim()) return;

    const sessionId = idRef.current; // 이미 만들어진 세션 ID가 있다고 가정

    const userMessage = {
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'], // 기본값 설정
      message: input,
    };

    // 테스트용 응답 (백엔드 응답이 여기에 들어왔다고 가정)
    const botMessages = [
      {
        sender: 'BOT',
        skinType: 'SENSITIVE',
        message: '민감성 피부에게는 자극이 될 수 있습니다.',
      },
      {
        sender: 'BOT',
        skinType: 'DRY',
        message: '건성 피부에게는 괜찮은 성분입니다.',
      },
    ];

    // 메시지 합쳐서 세션에 저장
    // 꼭 합쳐주어야 되나? 세션에 저장하려고 하긴 햇는데...
    setSessionMessages((prev) => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] || []), userMessage, ...botMessages],
    }));

    // 입력 초기화
    setInput('');
  };

  return (
    <ChatContextsh.Provider
      value={{
        input, // 사용자가 입력한 메세지
        setInput,
        selectedTypes, // 피부 타입 선택
        setSelectedTypes,
        isDropdownOpen, // 드롭다운 박스
        setIsDropdownOpen,
        sessionMessages, // 객체에 채팅 메세지가 배열로 저장됨
        setSessionMessages,
        handleSend, // 새로운 메세지 전송
      }}
    >
      {children}
    </ChatContextsh.Provider>
  );
};
export const useChat = () => useContext(ChatContextsh);
// 연결 코드

// const createChatSession = async () => {
//   // 1. 백엔드에 세션 생성 요청
//   const res = await fetch("http://localhost:8000/api/chat/sessions", {
//     method: "POST",
//   });
//   const data = await res.json();
//   const newSessionId = data.sessionId; // ✅ 백엔드가 넘겨준 sessionId

//   // 2. 사용자 메시지 저장
//   const newMessage = {
//     sender: 'USER',
//     message: input,
//     skinTypes:
//       selectedTypes.length > 0
//         ? selectedTypes
//         : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
//   };

//   setAllChatSessions((prev) => ({
//     ...prev,
//     [newSessionId]: [newMessage],
//   }));

//   return newSessionId;
// };
