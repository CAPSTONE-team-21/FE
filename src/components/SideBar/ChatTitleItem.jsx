// ✅ ChatTitleItem.jsx (TextOrInput만 적용, 나머지 원형 유지)
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../contexts/ChatContext';
import { IconStarG, IconStarY } from '../../utils/icons';
import TextOrInput from '../TextOrInput';

const ChatTitleItem = ({ session, isSelected }) => {
  const { setChatSessions, setCurrentSessionId, setSidebarOpen } = useContext(ChatContext);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(session.title);
  const nav = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        const input = document.getElementById(`input-${session.sessionId}`);
        if (input) {
          input.focus();
          input.select();
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isEditing, session.sessionId]);

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;
    setChatSessions((prev) =>
      prev.map((s) => (s.sessionId === session.sessionId ? { ...s, title: trimmed } : s))
    );
    setIsEditing(false);
  };

  const handleSelectSession = () => {
    setCurrentSessionId(session.sessionId);
    nav(`/chat/${session.sessionId}`);
    setSidebarOpen(false);
  };

  return (
    <div
      className={`
        flex items-center justify-between
        px-[10px] py-[8px] rounded-[10px]
        hover:bg-gray-stroke02 cursor-pointer
        ${isSelected ? 'bg-gray-stroke04' : ''}
      `}
      onDoubleClick={() => setIsEditing(true)}
      onClick={() => {
        if (!isEditing) handleSelectSession();
      }}
    >
      <div className="flex-1 text-gray/80">
        <TextOrInput
          id={`input-${session.sessionId}`}
          value={inputValue}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onChange={setInputValue}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setInputValue(session.title);
          }}
          className="text-[15px] font-medium leading-[1.4] truncate w-full"
        />
      </div>

      {/* 즐겨찾기 위치 확인용 */}
      {/*
      {session.isBookmark && (
        <img className="w-[16px] h-[16px] ml-[8px]" src={IconStarG} alt="즐겨찾기" />
      )}*/}
    </div>
  );
};

export default ChatTitleItem;
