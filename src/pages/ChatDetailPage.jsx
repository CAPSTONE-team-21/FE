import { ChatProvider } from '../contexts/ChatContextsh';
import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';
import ChatSection from '../components/ChatPage/ChatSection';
import ChatInputBox from '../components/ChatPage/ChatInputBox';

const ChatDetailPage = () => {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen w-full bg-white">
        <Header />

        {/* 채팅 메시지 영역 - 입력창 공간 확보 위해 pb-[100px] */}
        <div className="flex-1 flex justify-center overflow-y-auto pt-10 pb-[100px]">
          <div className="w-[760px]">
            <ChatSection />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};
export default ChatDetailPage;
