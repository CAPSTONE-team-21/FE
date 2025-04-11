import { useParams } from 'react-router-dom';
import { ChatProvider } from '../contexts/ChatContextsh';
import Header from '../components/Header';
import SideBar from '../components/SideBar/SideBar';

const ChatDetailPage = () => {
  let params = useParams();

  return (
    <ChatProvider>
      <div className="text-center p-10">
        <Header />
        <SideBar />
        <h1 className="text-2xl font-bold">chatdetail Page {params.sessionid}</h1>
      </div>
    </ChatProvider>
  );
};
export default ChatDetailPage;
