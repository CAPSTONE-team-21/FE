// ChatContext.jsx (API 명세서 기준으로 sessionId 사용)
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // // ✨ 초기 mock 세션 데이터
  // const initialMockData = [
  //   {
  //     sessionId: uuidv4(),
  //     title: '기본 세션',
  //     isBookmark: false,
  //   },
  //   {
  //     sessionId: uuidv4(),
  //     title: '나의 스킨케어 챗나의 스킨케어 챗',
  //     isBookmark: true,
  //   },
  //   {
  //     sessionId: uuidv4(),
  //     title: '제목을 입력해주세요.',
  //     isBookmark: true,
  //   },
  // ];

  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ✅ mock 데이터 불러오기
  const fetchChatSessions = async () => {
    try {
      const response = await axios.get('/chat/sessions');
      setChatSessions(response.data);
    } catch (error) {
      console.error('세션 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchChatSessions(); // 페이지 로드시 실행
  }, []);

  // ✅ 새로운 세션 생성
  const createChatSession = async () => {
    const res = await axios.post('/chat/sessions', { title: '제목을 입력해주세요.' });

    const newSession = res.data;

    setCurrentSessionId(res.data.sessionId);
    await fetchChatSessions(); // 여기서 바로 목록 갱신
    return newSession.sessionId;
  };

  // ✅ 제목 수정
  const updateChatTitle = async (sessionId, newTitle) => {
    try {
      const res = await axios.patch(`/chat/sessions/${sessionId}/title`, { title: newTitle });

      const updated = res.data;

      // id가 같으면 title update
      setChatSessions((prev) =>
        prev.map((s) => (s.sessionId === sessionId ? { ...s, title: updated.title } : s))
      );
    } catch (err) {
      console.error('제목 수정 실패:', err);
    }
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
