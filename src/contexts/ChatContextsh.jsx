import { createContext, useContext, useState, useRef } from 'react';

export const ChatContextsh = createContext();

export const ChatProvider = ({ children }) => {
  const [sessionMessages, setSessionMessages] = useState([]); // 채팅방 별 메세지 (봇, 유저 구분)
  const [input, setInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [skinTypes, setSkinTypes] = useState([
    'DRY',
    'OILY',
    'SENSITIVE',
    'COMBINED', // ✅ 선택할 수 있는 전체 타입 목록
  ]);

  const idRef = useRef(0);

  const handleSend = () => {
    if (!input.trim()) return;

    // const sessionId = idRef.current; // 이미 만들어진 세션 ID가 있다고 가정

    const userMessage = {
      id: idRef.current++,
      sender: 'USER',
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINED'], // 기본값 설정
      message: input,
    };

    // 메시지 합쳐서 저장
    // 세션 - 백한테 코드 받고, 봇 메세지를 이 sessionMessages에 추가해줄 것 -> 필터링하여 보여줌
    setSessionMessages((prev) => [...prev, userMessage]);
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
        skinTypes, // 모든 피부 스킨 타입
        setSkinTypes,
      }}
    >
      {children}
    </ChatContextsh.Provider>
  );
};
export const useChat = () => useContext(ChatContextsh);
