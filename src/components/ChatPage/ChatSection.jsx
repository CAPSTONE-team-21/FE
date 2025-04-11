import ChatInputBox from './ChatInputBox';
import Header from '../Header';

const ChatSection = () => {
  return (
    <div className="relative w-[760px] h-[calc(100vh-60px)] bg-white">
      {/* 메시지 영역 */}
      <div className="overflow-y-auto h-full pb-[100px]">{/* 여기에 채팅 메시지들 */}</div>

      {/* 입력창 - 고정 */}
      <div className="fixed bottom-0 w-full flex justify-center bg-white z-10 py-3">
        <ChatInputBox />
      </div>
    </div>
  );
};

export default ChatSection;
