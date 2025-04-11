// ChatContext.jsx (백엔드 없이도 동작하는 mock 버전)
import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // ✨ 초기 더미 세션 데이터
  const initialMockData = [
    {
      id: uuidv4(),
      title: '기본 세션',
      is_bookmark: false,
    },
    {
      id: uuidv4(),
      title: '나의 스킨케어 챗나의 스킨케어 챗',
      is_bookmark: true,
    },
    {
      id: uuidv4(),
      title: '제목을 입력해주세요.',
      is_bookmark: true,
    },
  ];

  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ✅ 더미 세션 불러오기 (fetch 대신 사용)
  const fetchChatSessions = () => {
    setChatSessions(initialMockData);
  };

  useEffect(() => {
    fetchChatSessions(); // 페이지 처음 들어올 때 자동 실행
  }, []);

  // ✅ 임시로 새로운 세션 생성 (백엔드 없이 동작)
  const createChatSession = ({ mode, skin_type }) => {
    const newSession = {
      id: uuidv4(),
      title: '제목을 입력해주세요.',
      is_bookmark: false,
    };
    setChatSessions((prev) => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    return newSession.id;
  };

  // ✅ 제목 수정
  const updateChatTitle = (sessionId, newTitle) => {
    setChatSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? { ...session, title: newTitle } : session))
    );
  };

  // ✅ 즐겨찾기 토글
  const toggleBookmark = (sessionId) => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, is_bookmark: !session.is_bookmark } : session
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
