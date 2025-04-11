import ChatInputBox from './ChatInputBox';
import { useChat } from '../../contexts/ChatContextsh';
import Header from '../Header';
import UserChat from './UserChat';

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
        {Object.entries(sessionMessages).map(([sessionId, messages]) => (
          <div key={sessionId}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-lg max-w-[70%] ${
                  msg.sender === 'BOT'
                    ? 'bg-gray-200 text-left'
                    : 'bg-blue-500 text-white ml-auto text-right'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.message}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 입력창 - 고정 */}
      <div className="fixed bottom-0 w-full flex justify-center bg-white z-10 pb-3">
        <ChatInputBox />
      </div>
    </div>
  );
};

export default ChatSection;
