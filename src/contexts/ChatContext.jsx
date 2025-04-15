// ChatContext.jsx (API 명세서 기준으로 sessionId 사용)
import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // ✨ 초기 mock 세션 데이터
  const initialMockData = [
    {
      sessionId: uuidv4(),
      title: '기본 세션',
      isBookmark: false,
    },
    {
      sessionId: uuidv4(),
      title: '나의 스킨케어 챗나의 스킨케어 챗',
      isBookmark: true,
    },
    {
      sessionId: uuidv4(),
      title: '제목을 입력해주세요.',
      isBookmark: true,
    },
  ];

  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ✅ mock 데이터 불러오기
  const fetchChatSessions = () => {
    setChatSessions(initialMockData);
  };

  useEffect(() => {
    fetchChatSessions(); // 페이지 로드시 실행
  }, []);

  // ✅ 새로운 세션 생성
  const createChatSession = () => {
    const newSession = {
      sessionId: uuidv4(),
      title: '제목을 입력해주세요.',
      isBookmark: false,
    };
    setChatSessions((prev) => [...prev, newSession]);
    setCurrentSessionId(newSession.sessionId);
    return newSession.sessionId;
  };

  // ✅ 제목 수정
  const updateChatTitle = (sessionId, newTitle) => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.sessionId === sessionId ? { ...session, title: newTitle } : session
      )
    );
  };

  // ✅ 즐겨찾기 토글
  const toggleBookmark = (sessionId) => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.sessionId === sessionId ? { ...session, isBookmark: !session.isBookmark } : session
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chatSessions,
        currentSessionId,
        isSidebarOpen,
        createChatSession,
        fetchChatSessions,
        updateChatTitle,
        setCurrentSessionId,
        setSidebarOpen,
        toggleBookmark,
        setChatSessions,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
