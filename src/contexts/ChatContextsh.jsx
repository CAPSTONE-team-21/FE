import { createContext, useContext, useState, useRef } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [allChatSessions, setAllChatSessions] = useState({});
  const [input, setInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const idRef = useRef(3);

  const createChatSession = () => {
    const newSessionId = idRef.current++;
    const newMessage = {
      message: input,
      skinTypes:
        selectedTypes.length > 0 ? selectedTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
    };

    setAllChatSessions((prev) => ({
      ...prev,
      [newSessionId]: [newMessage],
    }));

    return newSessionId;
  };

  return (
    <ChatContext.Provider
      value={{
        input,
        setInput,
        selectedTypes,
        setSelectedTypes,
        isDropdownOpen,
        setIsDropdownOpen,
        allChatSessions,
        setAllChatSessions,
        createChatSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
