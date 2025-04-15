// ✅ ChatTitle.jsx (백엔드 연동 기준, 메시지 전까지는 타이틀 없음 + 메인에서 제외)
import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatContext } from '../../contexts/ChatContext';
import { useChat } from '../../contexts/ChatContextsh';
import TextOrInput from '../TextOrInput';
import { IconEdit } from '../../utils/icons';

const ChatTitle = () => {
  const { chatSessions, currentSessionId, setChatSessions } = useContext(ChatContext);
  const { sessionMessages } = useChat();

  const location = useLocation();
  const currentSession = chatSessions.find((s) => s.sessionId === currentSessionId);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (currentSession && !isEditing) {
      setInputValue(currentSession.title || '');
    }
  }, [currentSession?.title, isEditing]);

  // ✅ 메인(/chat)에서는 타이틀 숨김, 메시지 없으면 숨김
  if (location.pathname === '/chat' || sessionMessages.length === 0) return null;

  const isPlaceholder = !currentSession.title || currentSession.title === '제목을 입력해주세요.';

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;

    setChatSessions((prev) =>
      prev.map((s) => (s.sessionId === currentSessionId ? { ...s, title: trimmed } : s))
    );
    setIsEditing(false);
  };

  const calculateInputWidth = (text = '') => {
    let width = 0;
    for (let char of text.toString()) {
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(char)) width += 13;
      else if (/[A-Z]/.test(char)) width += 10;
      else if (/[a-z]/.test(char)) width += 8;
      else if (/\d/.test(char)) width += 9;
      else width += 10;
    }
    return Math.max(width + 20, 60);
  };

  return (
    <div
      className={`
        flex items-center gap-[8px] sm:gap-[10px] text-[14px] sm:text-[16px] leading-[1]
        ${isPlaceholder ? 'text-gray/80' : 'text-gray'} font-medium
        px-[12px] sm:px-[16px] py-[6px] sm:py-[7px] rounded-[10px]
        max-w-full sm:max-w-[1000px]
        cursor-pointer transition-all duration-150 ease-in-out
        ${isEditing ? 'bg-gray-stroke03' : 'hover:bg-gray-stroke03'}
      `}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex-1" style={{ width: `${calculateInputWidth(inputValue)}px` }}>
        <TextOrInput
          value={inputValue || '제목을 입력해주세요.'}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onChange={setInputValue}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setInputValue(currentSession.title || '');
          }}
          className="text-[16px] font-medium leading-[1] truncate min-w-[30px] max-w-[1000px] w-full"
        />
      </div>
      <img
        src={IconEdit}
        alt="수정 아이콘"
        className="w-[12px] h-auto cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      />
    </div>
  );
};

export default ChatTitle;
