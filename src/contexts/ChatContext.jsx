import { createContext, useState, useEffect } from 'react';
import {
  fetchChatSessions as fetchChatSessionsAPI,
  createChatSession as createChatSessionAPI,
  updateChatTitle as updateChatTitleAPI,
} from '../utils/chatmk'; // 위치는 상황에 따라 조정

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fetchChatSessions = async () => {
    const data = await fetchChatSessionsAPI();
    setChatSessions(data);
  };

  useEffect(() => {
    fetchChatSessions();
  }, []);

  const createChatSession = async () => {
    const newSession = await createChatSessionAPI();
    setCurrentSessionId(newSession.sessionId);
    await fetchChatSessions();
    return newSession.sessionId;
  };

  const updateChatTitle = async (sessionId, newTitle) => {
    const updated = await updateChatTitleAPI(sessionId, newTitle);
    setChatSessions((prev) =>
      prev.map((s) => (s.sessionId === sessionId ? { ...s, title: updated.title } : s))
    );
  };

  const toggleBookmark = (sessionId) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.sessionId === sessionId ? { ...s, isBookmark: !s.isBookmark } : s))
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
