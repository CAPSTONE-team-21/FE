import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../contexts/ChatContext';
import { IconPlus } from '../../utils/icons';

const NewChatButton = () => {
  const { createChatSession, setSidebarOpen } = useContext(ChatContext);
  const nav = useNavigate();

  const handleNewChat = () => {
    // 새로운 임시 세션 생성 (백 response 대용)
    createChatSession({
      mode: 'product_detail',
      skin_type: '건성',
    });

    // 사이드바 닫음
    setSidebarOpen(false);

    // 메인 채팅 입력 화면으로 이동
    nav('/chat');
  };

  return (
    <div
      className="flex w-full h-[38px] px-[10px] py-[8px]
        rounded-[15px] gap-[12px] text-main
        hover:bg-main-newChatHover cursor-pointer"
      onClick={handleNewChat}
    >
      <img className="w-[20px] h-[20px]" src={IconPlus} alt="채팅추가버튼" />
      <div className="font-bold">새 채팅</div>
    </div>
  );
};

export default NewChatButton;
