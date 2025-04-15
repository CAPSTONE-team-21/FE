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

  // ✅ session.title이 바뀌면 inputValue도 갱신
  useEffect(() => {
    setInputValue(session.title);
  }, [session.title]);

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
      {/* ✅ 제목 영역 */}
      <div className="flex items-center flex-1 min-w-0">
        {' '}
        {/* 핵심 */}
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
          className="text-[15px] font-medium leading-[1.4] truncate overflow-hidden whitespace-nowrap"
        />
      </div>

      {/* ✅ 즐겨찾기 아이콘 - 항상 오른쪽 */}
      {/* {session.isBookmark && (
        <img className="w-[16px] h-[16px] ml-[8px] shrink-0" src={IconStarG} alt="즐겨찾기" />
      )} */}
    </div>
  );
};

export default ChatTitleItem;
