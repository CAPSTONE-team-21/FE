import ChatInputBox from './ChatInputBox';
import UserChat from './UserChat';
import BotChat from './BotChat';

import { useChat } from '../../contexts/ChatContextsh';

const ChatSection = () => {
  const {
    // input,
    // setInput,
    // selectedTypes,
    // setSelectedTypes,
    // isDropdownOpen,
    // setIsDropdownOpen,
    // handleSend,
    sessionMessages,
  } = useChat();

  return (
    <div className="flex-col w-[760px] h-full bg-white ">
      <div className="overflow-y-auto h-full pb-[100px] px-4 pt-4 space-y-5">
        <UserChat sessionMessages={sessionMessages} />
        <BotChat sessionMessages={sessionMessages} />
      </div>

      {/* 입력창 - 고정 */}
      <div className="fixed bottom-0 w-full flex justify-center bg-white z-10 pb-3">
        <ChatInputBox />
      </div>
    </div>
  );
};

export default ChatSection;
