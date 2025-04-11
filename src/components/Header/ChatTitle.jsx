// ✅ ChatTitle.jsx
import { useContext, useState } from 'react';
import { ChatContext } from '../../contexts/ChatContext';
import TextOrInput from '../TextOrInput';
import { IconEdit } from '../../utils/icons';

const ChatTitle = ({ isHeader = false }) => {
  const { chatSessions, currentSessionId, setChatSessions } = useContext(ChatContext);
  const currentSession = chatSessions.find((s) => s.id === currentSessionId);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(currentSession?.title || '');

  const isPlaceholder = currentSession?.title === '제목을 입력해주세요.';

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;
    setChatSessions((prev) =>
      prev.map((s) => (s.id === currentSessionId ? { ...s, title: trimmed } : s))
    );
    setIsEditing(false);
  };

  const calculateInputWidth = (text) => {
    let width = 0;
    for (let char of text) {
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(char)) {
        width += 13; // 한글
      } else if (/[A-Z]/.test(char)) {
        width += 10; // 영어 대문자
      } else if (/[a-z]/.test(char)) {
        width += 8; // 영어 소문자
      } else if (/\d/.test(char)) {
        width += 9; // 숫자
      } else {
        width += 10; // 특수문자 등 기타
      }
    }
    return Math.max(width + 20, 60); // 여유 패딩 + 최소 너비 보장
  };

  if (!currentSession) {
    return <div className="text-gray/80 text-[16px] px-4 ">채팅을 준비 중입니다...</div>;
  }

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
          value={inputValue}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onChange={setInputValue}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setInputValue(currentSession.title);
          }}
          className="text-[16px] font-medium leading-[1] truncate min-w-[30px] max-w-[1000px] w-full"
        />
      </div>

      {isHeader && (
        <img
          src={IconEdit}
          alt="수정 아이콘"
          className="w-[12px] h-auto cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        />
      )}
    </div>
  );
};

export default ChatTitle;
